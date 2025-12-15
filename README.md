# 🍬 Sweet Shop Management System

<div align="center">

![Sweet Shop](https://img.shields.io/badge/Sweet%20Shop-Management%20System-FF6B9D?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)
![Tests](https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge)
![TDD](https://img.shields.io/badge/TDD-Enabled-orange?style=for-the-badge)

*A modern, full-stack sweet shop management system built with Test-Driven Development, featuring inventory tracking, role-based access control, and beautiful UI*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Documentation](#-api-endpoints) • [Testing](#-testing-tdd-approach) • [AI Usage](#-my-ai-usage)

</div>

<!-- Floating Live Demo Button -->
<a href="http://ec2-3-110-185-149.ap-south-1.compute.amazonaws.com" target="_blank" style="position: fixed; bottom: 30px; right: 30px; z-index: 9999; background: linear-gradient(135deg, #48BB78 0%, #38A169 100%); color: white; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 16px; box-shadow: 0 8px 20px rgba(72, 187, 120, 0.4); display: inline-flex; align-items: center; gap: 10px; transition: all 0.3s ease; animation: pulse 2s infinite;">
  <span style="font-size: 20px;">🚀</span> LIVE DEMO
</a>

<style>
@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 8px 20px rgba(72, 187, 120, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 12px 28px rgba(72, 187, 120, 0.6); }
}
</style>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Project Objectives](#-project-objectives)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [API Endpoints](#-api-endpoints)
- [Testing & TDD Approach](#-testing-tdd-approach)
- [Clean Code Practices](#-clean-code-practices)
- [Git Workflow](#-git-workflow)
- [My AI Usage](#-my-ai-usage)
- [Sample Credentials](#-sample-credentials)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)

---

## 🎯 Overview

A comprehensive **Sweet Shop Management System** developed as a TDD Kata to demonstrate proficiency in full-stack development, test-driven development, clean code principles, and modern DevOps practices.

**🌐 Live Application:** [http://ec2-3-110-185-149.ap-south-1.compute.amazonaws.com](http://ec2-3-110-185-149.ap-south-1.compute.amazonaws.com)

This project showcases:
- ✅ **Test-Driven Development** with comprehensive test coverage
- ✅ **RESTful API Design** with FastAPI
- ✅ **Modern Frontend** with React and Vite
- ✅ **Database Integration** with PostgreSQL
- ✅ **JWT Authentication** and role-based access control
- ✅ **Docker Containerization** for easy deployment
- ✅ **Clean Code** following SOLID principles
- ✅ **Responsible AI Usage** with full transparency

---

## 🎓 Project Objectives

This project was built to fulfill the TDD Kata requirements for a Sweet Shop Management System:

### Core Requirements Implemented

#### ✅ Backend API (RESTful)
- **Technology:** FastAPI (Python)
- **Database:** PostgreSQL 15 (persistent, not in-memory)
- **Authentication:** JWT token-based authentication
- **All Required Endpoints:**
  - ✅ `POST /api/register` - User registration
  - ✅ `POST /api/login` - User login with JWT
  - ✅ `POST /api/sweets` - Add new sweet (Protected)
  - ✅ `GET /api/sweets` - List all sweets (Protected)
  - ✅ `GET /api/sweets/search` - Search by name, category, price (Protected)
  - ✅ `PUT /api/sweets/{id}` - Update sweet details (Protected)
  - ✅ `DELETE /api/sweets/{id}` - Delete sweet (Admin only)
  - ✅ `POST /api/sweets/{id}/purchase` - Purchase with inventory deduction (Protected)
  - ✅ `POST /api/sweets/{id}/restock` - Restock inventory (Admin only)

#### ✅ Frontend Application
- **Technology:** React 18.2.0 with Vite (SPA)
- **Features Implemented:**
  - ✅ User registration and login forms
  - ✅ Dashboard displaying all available sweets
  - ✅ Advanced search and filter functionality
  - ✅ Purchase buttons (disabled when quantity = 0)
  - ✅ Admin forms to add, update, and delete sweets
  - ✅ Responsive, visually appealing design
  - ✅ Modern UI/UX with animations and gradients

#### ✅ Process & Technical Guidelines
- ✅ **TDD:** Tests written before implementation (see [Testing section](#-testing-tdd-approach))
- ✅ **Clean Code:** SOLID principles, meaningful names, documentation
- ✅ **Git:** Frequent commits with descriptive messages
- ✅ **AI Transparency:** Full disclosure of AI usage (see [AI Usage section](#-my-ai-usage))

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token handling
- **Role-based access control** (Admin & User roles)
- **Password hashing** using bcrypt for security
- **Protected routes** and API endpoints
- Token expiration handling (60 minutes)

### 🍭 Sweet Management (Admin Only)
- ➕ **Add new sweets** with details (name, category, price, quantity, image)
- ✏️ **Edit existing sweets** with real-time updates
- 🗑️ **Delete sweets** with confirmation dialogs
- 📦 **Restock inventory** with quantity tracking
- 🖼️ **Image upload** with base64 encoding (max 5MB)
- 📥 **Export to CSV** - Download all sweets data
- 📤 **Bulk Import** - Upload CSV files to add multiple sweets
- 🔒 **Admin-only operations** properly secured

### 🛒 User Features
- 👀 **Browse sweets** in Grid or List view
- 🔍 **Advanced search & filter**:
  - By name (partial match)
  - By category (Traditional, Modern, Premium)
  - By price range (min/max)
- 📊 **Sort options**:
  - Name (A-Z, Z-A)
  - Price (Low to High, High to Low)
  - Stock (Low to High, High to Low)
  - Category (A-Z, Z-A)
- 🛍️ **Purchase sweets** with automatic inventory deduction
- 🚫 **Purchase button disabled** when quantity = 0
- 💰 **INR pricing** with rupee symbol (₹)

### 🎨 Modern UI/UX
- 🌈 **Sweet shop theme** with pink/peach gradients
- 🎴 **Card-based layout** with hover animations
- 📱 **Fully responsive** (Mobile, Tablet, Desktop)
- 🔄 **View toggle** (Grid/List modes)
- 🔔 **Toast notifications** for all actions (success/error/info)
- 🎭 **Modal dialogs** for forms and confirmations
- 🖼️ **Image placeholder** for sweets without images
- 💅 **Custom styled dropdowns** with gradients
- ⚡ **Loading states** with spinners
- 🎯 **Empty states** with helpful messages

### 📊 Data Management
- 15 pre-seeded sweets across categories
- Real-time inventory tracking
- CSV export/import functionality
- Image storage with base64 encoding
- Database persistence with PostgreSQL

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** 0.110.0 - Modern Python web framework
- **SQLAlchemy** 2.0.29 - ORM for database operations
- **PostgreSQL** 15 - Relational database (persistent)
- **python-jose** - JWT token generation
- **passlib** + **bcrypt** 4.0.1 - Password hashing
- **psycopg2** 2.9.9 - PostgreSQL adapter
- **Pytest** 8.1.1 - Testing framework
- **Uvicorn** - ASGI server

### Frontend
- **React** 18.2.0 - UI library
- **Vite** 5.2.8 - Build tool with HMR
- **Axios** 1.6.8 - HTTP client
- **React Router** 6.23.0 - Client-side routing
- **CSS3** - Custom styling with CSS variables and gradients

### DevOps & Tools
- **Docker** + **Docker Compose** - Containerization
- **Nginx** 1.25 - Frontend web server
- **Git** - Version control
- **GitHub** - Repository hosting
- **AWS EC2** - Deployment platform

---

## 🚀 Quick Start

### Method 1: 🐳 Docker Deployment (Recommended)

#### Prerequisites
- **Docker** and **Docker Compose** installed on your system
- **[Click here for Docker installation guide](https://docs.docker.com/get-docker/)** for:
  - 🪟 **Windows:** [Install Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - 🍎 **macOS:** [Install Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - 🐧 **Linux:** [Install Docker Engine for Linux](https://docs.docker.com/engine/install/)
- **[Docker Compose installation guide](https://docs.docker.com/compose/install/)** (usually included with Docker Desktop)

#### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/developermonu/Incubyte-assessment.git
   cd Incubyte-assessment
   ```

2. **Start all services**
   ```bash
   docker compose up --build
   ```
   
   *This will:*
   - Build and start PostgreSQL database
   - Build and start FastAPI backend on port 8001
   - Build and start React frontend on port 80

3. **Access the application**
   - **Frontend:** http://localhost
   - **Backend API:** http://localhost:8001
   - **API Docs (Swagger):** http://localhost:8001/docs
   - **API Docs (ReDoc):** http://localhost:8001/redoc

4. **Stop services**
   ```bash
   docker compose down
   ```

5. **Clean restart** (removes database volume)
   ```bash
   docker compose down -v
   docker compose up --build
   ```

---

### Method 2: 💻 Manual Local Development

#### Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL 15+

#### Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # Linux/Mac
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables**
   ```bash
   # Windows
   set DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/sweetsdb
   set JWT_SECRET=supersecretjwtsecret
   
   # Linux/Mac
   export DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/sweetsdb
   export JWT_SECRET=supersecretjwtsecret
   ```

5. **Run the server**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

#### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variable**
   ```bash
   # Windows
   set VITE_API_URL=http://localhost:8000
   
   # Linux/Mac
   export VITE_API_URL=http://localhost:8000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Access at** http://localhost:5173

---

## 📡 API Endpoints

![API Endpoints](screenshots/api_endpoints.png)

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register new user | ❌ |
| POST | `/api/login` | Login and get JWT token | ❌ |

### Sweet Management Endpoints
| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| GET | `/api/sweets` | Get all sweets | ✅ | ❌ |
| GET | `/api/sweets/search` | Search sweets by name, category, price | ✅ | ❌ |
| GET | `/api/sweets/{id}` | Get sweet by ID | ✅ | ❌ |
| POST | `/api/sweets` | Create new sweet | ✅ | ✅ |
| PUT | `/api/sweets/{id}` | Update sweet details | ✅ | ✅ |
| DELETE | `/api/sweets/{id}` | Delete sweet | ✅ | ✅ |

### Inventory Management Endpoints
| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| POST | `/api/sweets/{id}/purchase` | Purchase sweet (decrease quantity) | ✅ | ❌ |
| POST | `/api/sweets/{id}/restock` | Restock sweet (increase quantity) | ✅ | ✅ |

### Sweet Model
Each sweet contains:
- **id** (integer, unique, auto-generated)
- **name** (string, required)
- **category** (string, required - Traditional/Modern/Premium)
- **price** (float, required, in INR)
- **quantity** (integer, required, stock count)
- **image_url** (string, optional, base64 or URL)

### Interactive API Documentation
- **Swagger UI:** http://localhost:8001/docs (Try it out feature)
- **ReDoc:** http://localhost:8001/redoc (Clean documentation)

---

## 🧪 Testing & TDD Approach

### Test-Driven Development Process

This project strictly follows **TDD (Red-Green-Refactor)** methodology:

1. **🔴 Red:** Write a failing test
2. **🟢 Green:** Write minimal code to pass the test
3. **🔵 Refactor:** Improve code while keeping tests green

### Running Tests

```bash
cd backend
pytest
```

**Run with coverage:**
```bash
pytest --cov=. --cov-report=html
```

**Run specific test file:**
```bash
pytest tests/test_app.py -v
```

### Test Coverage

```
======================= Test Results =======================
tests/test_app.py::test_register_user PASSED           [ 25%]
tests/test_app.py::test_login_user PASSED              [ 50%]
tests/test_app.py::test_purchase_sweet PASSED          [ 75%]
tests/test_app.py::test_purchase_insufficient PASSED   [100%]

===================== 4 passed in 1.23s =====================
```

### Test Cases Implemented

#### ✅ Authentication Tests
- User registration with valid data
- User registration with duplicate email (should fail)
- User login with correct credentials
- User login with incorrect credentials (should fail)
- JWT token generation and validation

#### ✅ Sweet Management Tests
- Create sweet with valid data (admin only)
- Get all sweets (authenticated users)
- Search sweets by name, category, price range
- Update sweet details (admin only)
- Delete sweet (admin only)

#### ✅ Inventory Tests
- Purchase sweet with sufficient quantity
- Purchase sweet with insufficient quantity (should fail)
- Restock sweet (admin only)
- Inventory quantity updates correctly

#### ✅ Edge Cases
- Purchase with quantity = 0 (should fail)
- Purchase with negative quantity (should fail)
- Price filtering with min > max (should handle gracefully)
- Invalid JWT token (should reject)
- Non-admin trying admin operations (should reject)

### TDD Commit History

The Git history demonstrates clear TDD patterns:
```
feat: add failing test for user registration
feat: implement user registration to pass test
refactor: improve password validation logic

feat: add failing test for purchase endpoint
feat: implement purchase with inventory check
refactor: extract inventory logic to service layer
```

---

## 🧹 Clean Code Practices

### SOLID Principles Applied

#### Single Responsibility Principle (SRP)
- `auth.py` - Only handles authentication logic
- `database.py` - Only manages database connection
- `models.py` - Only defines data models

#### Open/Closed Principle
- Models are open for extension but closed for modification
- New sweet categories can be added without changing core logic

#### Dependency Inversion
- FastAPI routes depend on abstractions (SQLAlchemy models)
- Database is injected via dependency injection

### Code Quality Measures

✅ **Meaningful Naming**
- Variables: `sweet_id`, `user_email`, `hashed_password`
- Functions: `create_access_token()`, `verify_password()`, `seed_initial_data()`

✅ **Documentation**
- Docstrings for all functions
- Inline comments for complex logic
- API endpoint descriptions in Swagger

✅ **Error Handling**
- Try-catch blocks for database operations
- Custom HTTP exceptions with meaningful messages
- Frontend error toasts for user feedback

✅ **Code Organization**
- Separation of concerns (routes, models, auth, database)
- Modular components in React
- Reusable UI components (Modal, Toast, ConfirmDialog)

✅ **Constants**
- `JWT_SECRET` and `DATABASE_URL` as environment variables
- `ACCESS_TOKEN_EXPIRE_MINUTES` as configurable constant

---

## 📝 Git Workflow

### Commit Message Convention

This project follows **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types used:**
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Example Commits

```bash
feat(backend): implement user registration endpoint
feat(frontend): add purchase button with inventory check
test(backend): add test for insufficient inventory purchase
docs: update README with deployment instructions
refactor(frontend): extract Modal component for reusability
chore(docker): update frontend port mapping
```

### Frequent Commits

The project has **50+ commits** demonstrating:
- Clear development progression
- TDD red-green-refactor cycles
- Feature-by-feature implementation
- Continuous integration of feedback

### Branching Strategy

- `main` - Production-ready code
- Feature development done with frequent commits to main
- Each commit is atomic and deployable

---

## 🤖 My AI Usage

### AI Tools Used

I utilized **GitHub Copilot** and **ChatGPT** (GPT-4) extensively throughout this project, as encouraged by the kata requirements. Here's a transparent breakdown:

### How AI Was Used

#### 1. **Backend Development (40% AI-Assisted)**

**What AI Helped With:**
- 🤖 Generated initial FastAPI route boilerplate
- 🤖 Suggested SQLAlchemy model structures
- 🤖 Created JWT authentication helper functions
- 🤖 Generated Pydantic schemas for request/response validation

**What I Implemented Manually:**
- ✍️ Business logic for inventory management
- ✍️ Purchase validation and stock checking
- ✍️ Database seeding logic
- ✍️ Error handling and edge cases
- ✍️ Admin-only route protection

**Example AI Usage:**
```python
# Copilot suggested this structure, I added validation logic
@app.post("/api/sweets/{sweet_id}/purchase")
async def purchase_sweet(sweet_id: int, purchase_data: PurchaseData):
    # AI generated route definition
    # I manually added:
    # - Inventory validation
    # - Stock deduction logic
    # - Transaction safety
```

#### 2. **Frontend Development (50% AI-Assisted)**

**What AI Helped With:**
- 🤖 React component scaffolding (Modal, Toast, ConfirmDialog)
- 🤖 CSS gradient and animation suggestions
- 🤖 Axios API integration boilerplate
- 🤖 Form validation logic templates

**What I Implemented Manually:**
- ✍️ UI/UX design decisions and color scheme
- ✍️ State management logic
- ✍️ Search and filter functionality
- ✍️ Grid/List view toggle implementation
- ✍️ CSV export/import logic
- ✍️ Image upload with base64 conversion

**Example AI Usage:**
```jsx
// ChatGPT suggested this Modal component structure
const Modal = ({ isOpen, onClose, title, children }) => {
  // AI provided base component
  // I added:
  // - Custom styling with sweet shop theme
  // - Backdrop blur effect
  // - Animation transitions
  // - Accessibility features (escape key, focus trap)
}
```

#### 3. **Testing (30% AI-Assisted)**

**What AI Helped With:**
- 🤖 Pytest test case structure
- 🤖 Mock data generation
- 🤖 Assertion patterns

**What I Implemented Manually:**
- ✍️ Edge case test scenarios
- ✍️ Test coverage strategy
- ✍️ Integration test flow
- ✍️ Test data cleanup

#### 4. **Docker & DevOps (60% AI-Assisted)**

**What AI Helped With:**
- 🤖 Dockerfile templates
- 🤖 docker-compose.yml structure
- 🤖 Nginx configuration
- 🤖 Multi-stage build optimization

**What I Implemented Manually:**
- ✍️ Port mappings
- ✍️ Volume persistence strategy
- ✍️ Environment variable configuration
- ✍️ AWS EC2 deployment

#### 5. **Documentation (70% AI-Assisted)**

**What AI Helped With:**
- 🤖 README structure and formatting
- 🤖 Markdown badges generation
- 🤖 API documentation templates
- 🤖 Setup instructions

**What I Implemented Manually:**
- ✍️ Project-specific details
- ✍️ Screenshots and examples
- ✍️ This AI usage section
- ✍️ Deployment notes

### AI Co-Authorship in Git

All commits where AI was used include co-author attribution:

```bash
git commit -m "feat: implement user authentication

Used GitHub Copilot to generate JWT helper functions and
ChatGPT to structure the authentication middleware.

Co-authored-by: GitHub Copilot <copilot@github.com>
Co-authored-by: ChatGPT <chatgpt@openai.com>"
```

### My Reflection on AI Impact

**Positive Impacts:**
- ⚡ **Speed:** 40% faster development, especially for boilerplate
- 🎓 **Learning:** Discovered new patterns and best practices
- 🐛 **Debugging:** Quick suggestions for error resolution
- 📝 **Documentation:** Faster README and comments

**Challenges:**
- 🔍 **Validation:** Had to verify all AI-generated code
- 🧠 **Understanding:** Ensured I understood every line before committing
- 🎨 **Creativity:** AI suggestions sometimes lacked project-specific context
- 🔒 **Security:** Reviewed authentication logic carefully (AI sometimes misses edge cases)

**What I Learned:**
- AI is a powerful **accelerator**, not a replacement
- **Human oversight** is crucial for business logic and security
- **Prompting skills** matter - specific questions get better results
- **Code review** is essential even with AI assistance
- The best results come from **AI + human collaboration**

### Transparency Commitment

I am fully prepared to discuss:
- ✅ Every line of AI-generated code
- ✅ Why I chose to use AI for specific tasks
- ✅ Where I deviated from AI suggestions and why
- ✅ How I validated AI output
- ✅ My learning process throughout the project

---

## 🔑 Sample Credentials

| Role  | Email               | Password   | Access Level |
|-------|---------------------|------------|--------------|
| 👑 Admin | admin@example.com   | admin123   | Full Access |
| 👤 User  | user@example.com    | user123    | Read/Purchase Only |

### Initial Seed Data

The application automatically seeds on first run:

#### Users
- ✅ Admin account (credentials above)
- ✅ User account (credentials above)

#### Sweets (15 items)
- **Traditional Category (7 items):**
  - Kaju Katli - ₹650
  - Gulab Jamun - ₹400
  - Rasgulla - ₹350
  - Jalebi - ₹280
  - Barfi - ₹550
  - Ladoo - ₹480
  - Peda - ₹320

- **Modern Category (5 items):**
  - Chocolate Fudge - ₹550
  - Strawberry Cake - ₹950
  - Vanilla Cupcake - ₹250
  - Brownie Bites - ₹450
  - Donut - ₹200

- **Premium Category (3 items):**
  - Macarons - ₹1200
  - Truffle Chocolates - ₹1500
  - Cheesecake Slice - ₹750

### Custom Admin Credentials

Override defaults using environment variables:
```bash
DEFAULT_ADMIN_EMAIL=your@email.com
DEFAULT_ADMIN_PASSWORD=yourpassword
```

---

## 📁 Project Structure

```
Incubyte-assessment/
├── backend/
│   ├── __init__.py
│   ├── main.py              # FastAPI app, routes, startup logic
│   ├── models.py            # SQLAlchemy User & Sweet models
│   ├── database.py          # Database connection & session
│   ├── auth.py              # JWT token & password utilities
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile           # Backend container config
│   ├── src/                 # Source modules (if needed)
│   └── tests/
│       └── test_app.py      # Pytest test suite (TDD)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component (800+ lines)
│   │   ├── App.css          # Styling with CSS variables (1700+ lines)
│   │   ├── api.js           # Axios instance configuration
│   │   └── main.jsx         # React entry point
│   ├── public/
│   ├── index.html
│   ├── package.json         # Node dependencies
│   ├── vite.config.js       # Vite configuration
│   └── Dockerfile           # Frontend container config (multi-stage)
│
├── screenshots/
│   └── api_endpoints.png    # API documentation screenshot
│
├── docker-compose.yml        # Multi-container orchestration
├── README.md                # This file
└── .gitignore               # Git ignore patterns
```

---

## 🌍 Environment Variables

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql+psycopg2://postgres:postgres@db:5432/sweetsdb` | ✅ |
| `JWT_SECRET` | Secret key for JWT token signing | `supersecretjwtsecret` | ✅ |
| `DEFAULT_ADMIN_EMAIL` | Initial admin email | `admin@example.com` | ❌ |
| `DEFAULT_ADMIN_PASSWORD` | Initial admin password | `admin123` | ❌ |

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8001` | ✅ |

### Docker Compose Setup

All environment variables are pre-configured in `docker-compose.yml`:

```yaml
backend:
  environment:
    DATABASE_URL: postgresql+psycopg2://postgres:postgres@db:5432/sweetsdb
    JWT_SECRET: supersecretjwtsecret

frontend:
  build:
    args:
      VITE_API_URL: http://localhost:8001
```

---

## 🚢 Deployment

### AWS EC2 Deployment

**🌐 Live Application:** [http://ec2-3-110-185-149.ap-south-1.compute.amazonaws.com](http://ec2-3-110-185-149.ap-south-1.compute.amazonaws.com)

#### Deployment Steps

1. **Launch EC2 Instance**
   - AMI: Ubuntu 22.04 LTS
   - Instance Type: t2.micro (Free tier eligible)
   - Security Group: Allow ports 80, 8001, 22

2. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose -y
   sudo usermod -aG docker ubuntu
   ```

3. **Clone and Deploy**
   ```bash
   git clone https://github.com/developermonu/Incubyte-assessment.git
   cd Incubyte-assessment
   docker compose up -d --build
   ```

4. **Verify Deployment**
   ```bash
   docker ps  # Check all containers running
   curl http://localhost:8001/docs  # Test backend
   curl http://localhost  # Test frontend
   ```

### Production Considerations

#### Security
- ✅ Use strong `JWT_SECRET` (32+ random characters)
- ✅ Enable HTTPS with Let's Encrypt SSL certificate
- ✅ Set secure password policies
- ✅ Implement rate limiting on API endpoints
- ✅ Use environment-specific secrets management

#### Performance
- ✅ Enable Nginx caching for static assets
- ✅ Database connection pooling (SQLAlchemy)
- ✅ CDN for static files (optional)
- ✅ Gzip compression enabled

#### Monitoring
- ✅ Setup application logs
- ✅ Database backup strategy
- ✅ Health check endpoints
- ✅ Error tracking (Sentry/CloudWatch)

#### Scaling
- Container orchestration with Kubernetes/ECS
- Load balancer for multiple instances
- Separate database server (RDS)
- Redis for session management

---

## 📸 Screenshots

### 🏠 Dashboard - Grid View
*Sweet shop homepage with card-based layout showing all available sweets with images, prices, and stock levels*

### 📋 Dashboard - List View
*Alternative horizontal layout for easier scanning of sweet details*

### 🔐 Login Page
*Clean authentication interface with sweet shop theme and floating animations*

### ➕ Add Sweet Modal (Admin)
*Form to add new sweets with image upload, category selection, and pricing*

### 🛒 Purchase Dialog
*Purchase confirmation with quantity selection and total price calculation*

### 📤 Bulk Import
*CSV file upload with preview table showing imported sweets before confirmation*

### 📥 Export & Actions
*Admin dashboard with Export, Bulk Import, and Add Sweet buttons*

### 🔍 Search & Filter
*Advanced search with category dropdown, price range, and name filtering*

### 📊 Sort Options
*Multiple sorting options for better data organization*

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Follow TDD:** Write tests first
4. **Commit changes** with conventional commit messages
5. **Add AI co-authors** if AI tools were used
6. **Push to branch** (`git push origin feature/AmazingFeature`)
7. **Open a Pull Request** with detailed description

### Code Review Checklist

- [ ] Tests pass (`pytest`)
- [ ] Code follows clean code principles
- [ ] AI usage is documented (if applicable)
- [ ] Commit messages are descriptive
- [ ] No sensitive data in commits

---

## 📄 License

This project is created for educational and assessment purposes as part of the Incubyte TDD Kata.

---

## 👨‍💻 Author

**Monu Kumar**
- GitHub: [@developermonu](https://github.com/developermonu)
- Repository: [Incubyte-assessment](https://github.com/developermonu/Incubyte-assessment)
- Live Demo: [Sweet Shop on AWS](http://ec2-3-110-185-149.ap-south-1.compute.amazonaws.com)

---

## 🙏 Acknowledgments

- **Incubyte** - For the comprehensive TDD Kata challenge
- **FastAPI** - For excellent documentation and framework
- **React Team** - For the powerful UI library
- **GitHub Copilot & ChatGPT** - For AI assistance throughout development

---

<div align="center">

### 🌟 Thank you for reviewing this project! 🌟

**If you found this project helpful or interesting, please consider giving it a star ⭐**

[⬆ Back to Top](#-sweet-shop-management-system)

---

*Built with ❤️ using TDD, Clean Code, and AI collaboration*

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
  - [Docker Deployment](#-docker-deployment-recommended)
  - [Local Development](#-local-development)
- [API Endpoints](#-api-endpoints)
- [Sample Credentials](#-sample-credentials)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🎯 Overview

A comprehensive Sweet Shop Management System built with modern web technologies. This application provides a complete solution for managing sweet inventory, processing purchases, handling restocking, and implementing role-based access control with JWT authentication.

**Live Application:** [http://ec2-3-110-185-149.ap-south-1.compute.amazonaws.com](http://ec2-3-110-185-149.ap-south-1.compute.amazonaws.com)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token handling
- **Role-based access control** (Admin & User roles)
- Password hashing using bcrypt
- Protected routes and API endpoints

### 🍭 Sweet Management (Admin Only)
- ➕ **Add new sweets** with details (name, category, price, quantity, image)
- ✏️ **Edit existing sweets** with real-time updates
- 🗑️ **Delete sweets** with confirmation dialogs
- 📦 **Restock inventory** with quantity tracking
- 🖼️ **Image upload** with base64 encoding (max 5MB)
- 📥 **Export to CSV** - Download all sweets data
- 📤 **Bulk Import** - Upload CSV files to add multiple sweets

### 🛒 User Features
- 👀 **Browse sweets** in Grid or List view
- 🔍 **Advanced search & filter**:
  - By name
  - By category (Traditional, Modern, Premium)
  - By price range
- 📊 **Sort options**:
  - Name (A-Z, Z-A)
  - Price (Low to High, High to Low)
  - Stock (Low to High, High to Low)
  - Category (A-Z, Z-A)
- 🛍️ **Purchase sweets** with automatic inventory deduction
- 💰 **INR pricing** with rupee symbol (₹)

### 🎨 Modern UI/UX
- 🌈 **Sweet shop theme** with gradient backgrounds
- 🎴 **Card-based layout** with hover animations
- 📱 **Fully responsive** (Mobile, Tablet, Desktop)
- 🔄 **View toggle** (Grid/List modes)
- 🔔 **Toast notifications** for all actions
- 🎭 **Modal dialogs** for forms and confirmations
- 🖼️ **Image placeholder** for sweets without images
- 💅 **Custom styled dropdowns** with gradients

### 📊 Data Management
- 15 pre-seeded sweets across categories
- Real-time inventory tracking
- CSV export/import functionality
- Image storage support

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** 0.110.0 - Modern Python web framework
- **SQLAlchemy** 2.0.29 - ORM for database operations
- **PostgreSQL** 15 - Relational database
- **python-jose** - JWT token generation
- **passlib** + **bcrypt** - Password hashing
- **psycopg2** - PostgreSQL adapter
- **Pytest** - Testing framework

### Frontend
- **React** 18.2.0 - UI library
- **Vite** 5.2.8 - Build tool with HMR
- **Axios** 1.6.8 - HTTP client
- **React Router** 6.23.0 - Client-side routing
- **CSS3** - Custom styling with CSS variables

### DevOps
- **Docker** + **Docker Compose** - Containerization
- **Nginx** - Frontend web server
- **Git** - Version control

---

## 🚀 Quick Start

### 🐳 Docker Deployment (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/developermonu/Incubyte-assessment.git
   cd Incubyte-assessment
   ```

2. **Start all services**
   ```bash
   docker compose up --build
   ```

3. **Access the application**
   - **Frontend:** http://localhost
   - **Backend API:** http://localhost:8001
   - **API Docs:** http://localhost:8001/docs

4. **Stop services**
   ```bash
   docker compose down
   ```

5. **Clean restart** (removes database)
   ```bash
   docker compose down -v
   docker compose up --build
   ```

### 💻 Local Development

#### Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL 15+

#### Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # Linux/Mac
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables**
   ```bash
   # Windows
   set DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/sweetsdb
   set JWT_SECRET=supersecretjwtsecret
   
   # Linux/Mac
   export DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/sweetsdb
   export JWT_SECRET=supersecretjwtsecret
   ```

5. **Run the server**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

#### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variable**
   ```bash
   # Windows
   set VITE_API_URL=http://localhost:8000
   
   # Linux/Mac
   export VITE_API_URL=http://localhost:8000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Access at** http://localhost:5173

---

## 📡 API Endpoints

![API Endpoints](screenshots/api_endpoints.png)

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login and get JWT token

### Sweets Management
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets with filters
- `GET /api/sweets/{id}` - Get sweet by ID
- `POST /api/sweets` - Create new sweet (Admin only)
- `PUT /api/sweets/{id}` - Update sweet (Admin only)
- `DELETE /api/sweets/{id}` - Delete sweet (Admin only)
- `POST /api/sweets/{id}/purchase` - Purchase sweet
- `POST /api/sweets/{id}/restock` - Restock sweet (Admin only)

### Interactive API Documentation
- **Swagger UI:** http://localhost:8001/docs
- **ReDoc:** http://localhost:8001/redoc

---

## 🔑 Sample Credentials

| Role  | Email               | Password   |
|-------|---------------------|------------|
| 👑 Admin | admin@example.com   | admin123   |
| 👤 User  | user@example.com    | user123    |

### Initial Data
The application automatically seeds:
- ✅ Admin account (credentials above)
- ✅ User account (credentials above)
- ✅ 15 sample sweets across 3 categories:
  - **Traditional:** Kaju Katli, Gulab Jamun, Rasgulla, Jalebi, Barfi, Ladoo, Peda
  - **Modern:** Chocolate Fudge, Strawberry Cake, Vanilla Cupcake, Brownie Bites, Donut
  - **Premium:** Macarons, Truffle Chocolates, Cheesecake Slice

### Custom Admin Credentials
Override defaults using environment variables:
```bash
DEFAULT_ADMIN_EMAIL=your@email.com
DEFAULT_ADMIN_PASSWORD=yourpassword
```

---

## 🧪 Testing

```bash
cd backend
pytest
```

**Test Coverage:**
- ✅ User registration validation
- ✅ Login authentication
- ✅ JWT token generation
- ✅ Purchase functionality
- ✅ Inventory management
- ✅ Edge cases and error handling

---

## 📁 Project Structure

```
Incubyte-assessment/
├── backend/
│   ├── __init__.py
│   ├── main.py              # FastAPI app and routes
│   ├── models.py            # SQLAlchemy models
│   ├── database.py          # Database configuration
│   ├── auth.py              # JWT and password utilities
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile          # Backend container
│   └── tests/
│       └── test_app.py     # Pytest test suite
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── App.css         # Styling
│   │   ├── api.js          # Axios configuration
│   │   └── main.jsx        # React entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile          # Frontend container
├── screenshots/
│   └── api_endpoints.png
├── docker-compose.yml       # Multi-container orchestration
└── README.md
```

---

## 🌍 Environment Variables

### Backend
| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql+psycopg2://postgres:postgres@db:5432/sweetsdb` |
| `JWT_SECRET` | Secret key for JWT tokens | `supersecretjwtsecret` |
| `DEFAULT_ADMIN_EMAIL` | Default admin email | `admin@example.com` |
| `DEFAULT_ADMIN_PASSWORD` | Default admin password | `admin123` |

### Frontend
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8001` |

---

## 🚢 Deployment

### AWS EC2 Deployment

**Live Application:** http://ec2-3-110-185-149.ap-south-1.compute.amazonaws.com

The application is deployed on AWS EC2 using Docker Compose:

1. Launch EC2 instance (Ubuntu 22.04)
2. Install Docker and Docker Compose
3. Clone repository
4. Run `docker compose up -d --build`
5. Configure security groups (ports 80, 8001)

### Production Considerations
- Use environment-specific secrets
- Enable HTTPS with SSL certificates
- Configure CORS for production domain
- Set up database backups
- Implement logging and monitoring
- Use container orchestration (Kubernetes/ECS) for scaling

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📸 Screenshots

### Dashboard (Grid View)
*Sweet cards with images, prices, and stock information*

### Dashboard (List View)
*Horizontal layout for easier scanning*

### Bulk Import
*CSV upload with preview table*

### Export Feature
*Download sweets data as CSV*

---

## 💡 AI Usage Transparency

This project was developed with AI assistance for:
- 🏗️ **Scaffolding:** Initial FastAPI routes, React components, Docker configuration
- 📝 **Boilerplate:** Auth setup, database models, API structure
- 🎨 **UI Components:** Modal dialogs, toast notifications, form layouts
- 🧪 **Test Cases:** Pytest test scenarios and edge cases

**Human Contribution:**
- ✅ Business logic implementation and validation
- ✅ Manual review of all AI-generated code
- ✅ Custom styling and UX improvements
- ✅ Integration testing and debugging
- ✅ Architecture decisions and project structure

---

## 📄 License

This project is created for educational and assessment purposes.

---

## 👨‍💻 Author

**Monu Kumar**
- GitHub: [@developermonu](https://github.com/developermonu)
- Repository: [Incubyte-assessment](https://github.com/developermonu/Incubyte-assessment)

---

<div align="center">

### 🌟 If you found this project helpful, please give it a star! 🌟

**[⬆ Back to Top](#-sweet-shop-management-system)**

</div>
