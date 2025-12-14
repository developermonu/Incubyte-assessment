import os
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, constr
from sqlalchemy.orm import Session

import models
from auth import ALGORITHM, SECRET_KEY, create_access_token, hash_password, verify_password
from database import Base, SessionLocal, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sweet Shop Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def seed_initial_data() -> None:
    db = SessionLocal()
    try:
        admin_email = os.getenv("DEFAULT_ADMIN_EMAIL", "admin@example.com")
        admin_password = os.getenv("DEFAULT_ADMIN_PASSWORD", "admin123")

        existing_admin = db.query(models.User).filter(models.User.email == admin_email).first()
        if not existing_admin:
            db.add(
                models.User(
                    email=admin_email,
                    password_hash=hash_password(admin_password),
                    role="admin",
                )
            )

        sample_sweets = [
            {"name": "Kaju Katli", "category": "Traditional", "price": 8.5, "quantity": 20},
            {"name": "Gulab Jamun", "category": "Traditional", "price": 5.0, "quantity": 30},
            {"name": "Chocolate Fudge", "category": "Modern", "price": 6.5, "quantity": 15},
        ]
        for item in sample_sweets:
            exists = db.query(models.Sweet).filter(models.Sweet.name == item["name"]).first()
            if not exists:
                db.add(models.Sweet(**item))

        db.commit()
    finally:
        db.close()


@app.on_event("startup")
def on_startup() -> None:
    seed_initial_data()


class UserCreate(BaseModel):
    email: constr(strip_whitespace=True)
    password: constr(min_length=6)
    role: Optional[str] = "user"


class UserLogin(BaseModel):
    email: constr(strip_whitespace=True)
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


class SweetBase(BaseModel):
    name: str
    category: str
    price: float
    quantity: int


class SweetCreate(SweetBase):
    pass


class SweetUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None


class SweetOut(SweetBase):
    id: int

    class Config:
        orm_mode = True


class PurchaseRequest(BaseModel):
    quantity: int


class RestockRequest(BaseModel):
    quantity: int


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    from jose import JWTError, jwt

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError as exc:
        raise credentials_exception from exc

    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user


def get_current_admin(user: models.User = Depends(get_current_user)) -> models.User:
    if user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user


@app.post("/api/auth/register", response_model=TokenResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    role = user_data.role or "user"
    if role not in ("user", "admin"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid role")

    existing = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    user = models.User(email=user_data.email, password_hash=hash_password(user_data.password), role=role)
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(subject=user.email, role=user.role)
    return TokenResponse(access_token=token, role=user.role)


@app.post("/api/auth/login", response_model=TokenResponse)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(subject=user.email, role=user.role)
    return TokenResponse(access_token=token, role=user.role)


@app.get("/api/sweets", response_model=List[SweetOut])
def list_sweets(db: Session = Depends(get_db), _: models.User = Depends(get_current_user)):
    return db.query(models.Sweet).all()


@app.post("/api/sweets", response_model=SweetOut)
def create_sweet(sweet: SweetCreate, db: Session = Depends(get_db), _: models.User = Depends(get_current_admin)):
    new_sweet = models.Sweet(**sweet.dict())
    db.add(new_sweet)
    db.commit()
    db.refresh(new_sweet)
    return new_sweet


@app.get("/api/sweets/search", response_model=List[SweetOut])
def search_sweets(
    name: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_user),
):
    query = db.query(models.Sweet)
    if name:
        query = query.filter(models.Sweet.name.ilike(f"%{name}%"))
    if category:
        query = query.filter(models.Sweet.category.ilike(f"%{category}%"))
    if min_price is not None:
        query = query.filter(models.Sweet.price >= min_price)
    if max_price is not None:
        query = query.filter(models.Sweet.price <= max_price)
    return query.all()


@app.put("/api/sweets/{sweet_id}", response_model=SweetOut)
def update_sweet(
    sweet_id: int,
    sweet_update: SweetUpdate,
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_admin),
):
    sweet = db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sweet not found")

    for key, value in sweet_update.dict(exclude_unset=True).items():
        setattr(sweet, key, value)

    db.commit()
    db.refresh(sweet)
    return sweet


@app.delete("/api/sweets/{sweet_id}")
def delete_sweet(sweet_id: int, db: Session = Depends(get_db), _: models.User = Depends(get_current_admin)):
    sweet = db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sweet not found")

    db.delete(sweet)
    db.commit()
    return {"message": "Sweet deleted"}


@app.post("/api/sweets/{sweet_id}/purchase", response_model=SweetOut)
def purchase_sweet(
    sweet_id: int,
    payload: PurchaseRequest,
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_user),
):
    if payload.quantity <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Quantity must be positive")

    sweet = db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sweet not found")

    if sweet.quantity < payload.quantity:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Insufficient stock")

    sweet.quantity -= payload.quantity
    db.commit()
    db.refresh(sweet)
    return sweet


@app.post("/api/sweets/{sweet_id}/restock", response_model=SweetOut)
def restock_sweet(
    sweet_id: int,
    payload: RestockRequest,
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_admin),
):
    if payload.quantity <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Quantity must be positive")

    sweet = db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sweet not found")

    sweet.quantity += payload.quantity
    db.commit()
    db.refresh(sweet)
    return sweet
