# Sweet Shop Management System

A minimal FastAPI + React implementation to manage sweets, inventory, and authentication for a fictional sweet shop. The goal is interview-ready clarity over elaborate architecture.

## Tech Stack
- FastAPI, SQLAlchemy, PostgreSQL
- JWT auth with python-jose + passlib
- React + Vite + Axios
- Docker + docker-compose
- Pytest for smoke tests

## Run Locally
1. **Backend**
   ```powershell
   cd backend
   python -m venv .venv
   .\.venv\Scripts\activate
   pip install -r requirements.txt
   set DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/sweetsdb
   set JWT_SECRET=supersecretjwtsecret
   uvicorn main:app --reload
   ```
2. **Frontend** (new terminal)
   ```powershell
   cd frontend
   npm install
   set VITE_API_URL=http://localhost:8000
   npm run dev
   ```

## Run With Docker
```powershell
cd e:\Placements\Incubytes 3
docker compose up --build
```
- Backend available at `http://localhost:8001`
- Frontend available at `http://localhost:5173`
- PostgreSQL persisted via named volume

## API Endpoints
![API Endpoints](screenshots/api_endpoints.png)

## Sample Credentials
| Role  | Email               | Password   |
|-------|---------------------|------------|
| Admin | admin@example.com   | admin123   |
| User  | user@example.com    | user123    |

- Backend now seeds the admin account above plus three sweets (Kaju Katli, Gulab Jamun, Chocolate Fudge) on startup.
- Override defaults by setting `DEFAULT_ADMIN_EMAIL` / `DEFAULT_ADMIN_PASSWORD` before launching the API service.
- Use the register page to add any additional users you need for demos.

## Tests
```powershell
cd backend
pytest
```
Covers registration, login, and purchase edge cases.

## My AI Usage
- Used ChatGPT for scaffolding boilerplate (FastAPI routes, React forms, Docker files).
- Manually reviewed logic and wrote business rules directly in handlers.
- Leveraged AI suggestions for speed, then validated endpoints and tests by hand.
