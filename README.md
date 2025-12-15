# 🍬 Sweet Shop Management System

<div align="center">

![Sweet Shop](https://img.shields.io/badge/Sweet%20Shop-Management%20System-FF6B9D?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)

### 🚀 [**Live Demo**](http://ec2-3-110-185-149.ap-south-1.compute.amazonaws.com) 🚀

*A modern, full-stack sweet shop management system with inventory tracking, role-based access control, and beautiful UI*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Documentation](#-api-endpoints) • [Screenshots](#-screenshots)

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
