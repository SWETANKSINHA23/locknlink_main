# Locknlink - URL Shortener with JWT Authentication

[![Build Status](https://img.shields.io/github/actions/workflow/status/SWETANKSINHA23/locknlink_main/backend-ci.yml?branch=main&label=Backend%20CI)](https://github.com/SWETANKSINHA23/locknlink_main/actions)
[![Frontend CI](https://img.shields.io/github/actions/workflow/status/SWETANKSINHA23/locknlink_main/frontend-ci.yml?branch=main&label=Frontend%20CI)](https://github.com/SWETANKSINHA23/locknlink_main/actions)
[![Test Coverage](https://img.shields.io/codecov/c/github/SWETANKSINHA23/locknlink_main?label=Coverage)](https://codecov.io/gh/SWETANKSINHA23/locknlink_main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green.svg)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

> **Enterprise-grade URL shortener with advanced analytics, authentication, and modern DevOps practices**

![Locknlink Banner](https://via.placeholder.com/1200x300/667eea/ffffff?text=Locknlink+-+Professional+URL+Shortener)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
  - [Core Features](#core-features)
  - [Technical Features](#technical-features)
  - [DevOps & Quality](#devops--quality)
- [Tech Stack](#-tech-stack)
  - [Backend Stack](#backend-stack)
  - [Frontend Stack](#frontend-stack)
  - [DevOps & Testing](#devops--testing)
- [Architecture](#-architecture)
  - [System Architecture](#system-architecture)
  - [Data Flow](#data-flow)
  - [Database Schema](#database-schema)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running Locally](#running-locally)
- [Docker Deployment](#-docker-deployment)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Monitoring & Health Checks](#-monitoring--health-checks)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

**Locknlink** is a modern, enterprise-grade URL shortening service built with cutting-edge web technologies and DevOps best practices. Unlike traditional URL shorteners, Locknlink provides a comprehensive solution for individuals and businesses who need secure, trackable, and manageable short links.

The application combines powerful features like JWT-based authentication, real-time analytics, and password-protected URLs with a beautiful, responsive user interface. Every shortened URL comes with detailed click tracking, geographic insights, and referrer information, making it perfect for marketing campaigns, social media management, and brand building.

Built with scalability and maintainability in mind, Locknlink features a complete CI/CD pipeline, comprehensive test coverage (80%+ backend, 75%+ frontend), automated security scanning, and production-ready Docker containerization. Whether you're a developer looking to learn modern full-stack development or a business seeking a reliable URL management solution, Locknlink delivers professional-grade quality with an intuitive user experience.

---

## ✨ Features

### Core Features

- ✅ **URL Shortening with Custom Aliases** - Create memorable short links with personalized aliases
- ✅ **User Authentication & Authorization** - Secure JWT-based authentication system
- ✅ **Personal Dashboard** - Manage all your URLs from a centralized interface
- ✅ **Real-time Click Analytics** - Track clicks, geographic data, and referrer information
- ✅ **QR Code Generation** - Automatic QR code creation for each shortened URL
- ✅ **Link Expiration** - Set expiration dates for time-sensitive campaigns
- ✅ **Password Protection** - Secure sensitive links with password authentication
- ✅ **Active/Inactive Toggle** - Enable or disable links without deletion
- ✅ **Click History** - Detailed timestamp and metadata for every click
- ✅ **Bulk URL Management** - View, search, and filter all your links

### Technical Features

- ✅ **RESTful API Architecture** - Clean, documented API endpoints
- ✅ **Responsive Mobile-First Design** - Optimized for all devices and screen sizes
- ✅ **Component-Based React Architecture** - Reusable, maintainable UI components
- ✅ **Secure Password Hashing** - bcrypt encryption for user credentials
- ✅ **MongoDB Aggregation Pipeline** - Efficient analytics and reporting
- ✅ **CORS-Enabled API** - Cross-origin resource sharing support
- ✅ **Environment-Based Configuration** - Flexible deployment across environments
- ✅ **Error Handling & Validation** - Comprehensive input validation and error responses
- ✅ **Rate Limiting Ready** - Infrastructure for API rate limiting
- ✅ **Swagger API Documentation** - Interactive API documentation at `/api-docs`

### DevOps & Quality

- ✅ **Docker Containerization** - Multi-stage builds for backend and frontend
- ✅ **Docker Compose Orchestration** - Single-command deployment
- ✅ **CI/CD Pipelines** - Automated testing and deployment via GitHub Actions
- ✅ **Automated Testing** - Unit, integration, and E2E test suites
- ✅ **Code Quality Checks** - ESLint, Prettier, and TypeScript validation
- ✅ **Security Vulnerability Scanning** - Trivy, npm audit, and CodeQL analysis
- ✅ **Dependency Management** - Automated updates via Dependabot
- ✅ **Performance Testing** - k6 load testing scenarios
- ✅ **Monitoring & Metrics** - Prometheus metrics and Grafana dashboards
- ✅ **Health Checks** - Comprehensive health endpoints for all services
- ✅ **Kubernetes Ready** - Production-ready K8s deployment manifests

---

## 🛠 Tech Stack

### Backend Stack

| Technology | Version | Purpose | Usage in Project |
|-----------|---------|---------|-----------------|
| **Node.js** | 18.x | Runtime environment | Server execution, async operations, event-driven architecture |
| **Express.js** | 4.x | Web framework | RESTful API, middleware pipeline, routing, request handling |
| **MongoDB** | 6.x | NoSQL database | User data, URL mappings, analytics storage, aggregation |
| **Mongoose** | 7.x | ODM | Schema validation, database queries, relationship management |
| **JWT** | 9.x | Authentication | Token generation, user session management, authorization |
| **bcrypt** | 5.x | Cryptography | Password hashing, salt generation, secure verification |
| **dotenv** | 16.x | Configuration | Environment variable management, secrets handling |
| **cors** | 2.x | Security | Cross-origin resource sharing, API access control |
| **nanoid** | 4.x | ID generation | Short URL code generation, unique identifiers |
| **swagger-jsdoc** | 6.x | Documentation | OpenAPI specification generation |
| **swagger-ui-express** | 5.x | Documentation | Interactive API documentation interface |
| **prom-client** | 15.x | Monitoring | Prometheus metrics collection and exposure |

### Frontend Stack

| Technology | Version | Purpose | Usage in Project |
|-----------|---------|---------|-----------------|
| **React** | 18.x | UI library | Component-based interface, hooks, state management |
| **TypeScript** | 5.x | Type safety | Static typing, IDE support, compile-time error prevention |
| **Vite** | 5.x | Build tool | Fast HMR, optimized production builds, dev server |
| **React Router** | 6.x | Routing | SPA navigation, protected routes, dynamic routing |
| **Axios** | 1.x | HTTP client | API communication, request/response interceptors |
| **Chart.js** | 4.x | Data visualization | Analytics charts, graphs, real-time data display |
| **React Chart.js 2** | 5.x | React wrapper | Chart.js integration with React components |
| **CSS3** | - | Styling | Modern responsive design, animations, gradients |
| **Lucide React** | 0.x | Icons | Modern icon library, customizable SVG icons |

### DevOps & Testing

| Technology | Version | Purpose | Usage in Project |
|-----------|---------|---------|-----------------|
| **Docker** | 24.x | Containerization | Multi-stage builds, service isolation, deployment |
| **Docker Compose** | 2.x | Orchestration | Service coordination, networking, volume management |
| **GitHub Actions** | - | CI/CD | Automated testing, builds, security scans, deployment |
| **Jest** | 29.x | Testing framework | Unit and integration tests, coverage reporting |
| **Supertest** | 6.x | API testing | HTTP assertion, endpoint testing, integration tests |
| **Vitest** | 1.x | Frontend testing | React component testing, fast test execution |
| **React Testing Library** | 14.x | Component testing | User-centric testing, accessibility checks |
| **Playwright** | 1.x | E2E testing | Browser automation, multi-browser testing, user flows |
| **k6** | 0.x | Performance testing | Load testing, stress testing, performance benchmarks |
| **ESLint** | 8.x | Linting | Code quality, style enforcement, best practices |
| **Prettier** | 3.x | Formatting | Consistent code formatting, auto-formatting |
| **Husky** | 9.x | Git hooks | Pre-commit checks, commit message validation |
| **lint-staged** | 15.x | Staged linting | Run linters on staged files only |
| **commitlint** | 19.x | Commit validation | Conventional commit message enforcement |
| **Trivy** | - | Security scanning | Docker image vulnerability detection |
| **CodeQL** | - | Code analysis | Security vulnerability detection in code |
| **Dependabot** | - | Dependency updates | Automated dependency version updates |
| **Prometheus** | - | Metrics | Time-series metrics collection and storage |
| **Grafana** | - | Visualization | Metrics dashboards, alerting, monitoring |

---

## 🏗 Architecture

### System Architecture

Locknlink follows a modern **three-tier architecture** pattern, ensuring separation of concerns, scalability, and maintainability:

#### 1. **Presentation Layer** (React SPA with TypeScript)
- **Technology**: React 18 with TypeScript, Vite build tool
- **Responsibilities**:
  - User interface rendering and interaction
  - Client-side routing and navigation
  - Form validation and user input handling
  - State management for UI components
  - API communication via Axios
  - Real-time analytics visualization
- **Key Components**:
  - `AuthForm`: User authentication interface
  - `UrlShortener`: URL creation and management
  - `UrlList`: Display and manage user's URLs
  - `Analytics`: Dashboard with charts and metrics

#### 2. **Application Layer** (Express.js REST API with JWT Middleware)
- **Technology**: Node.js 18 with Express.js framework
- **Responsibilities**:
  - RESTful API endpoint handling
  - Business logic implementation
  - JWT token generation and validation
  - Request validation and sanitization
  - Error handling and logging
  - Database operations coordination
- **Key Modules**:
  - **Routes**: API endpoint definitions
  - **Controllers**: Request handling logic
  - **Middlewares**: Authentication, error handling, CORS
  - **Utils**: Helper functions, health checks, metrics

#### 3. **Data Layer** (MongoDB with Mongoose ODM)
- **Technology**: MongoDB 6.x with Mongoose 7.x
- **Responsibilities**:
  - Data persistence and retrieval
  - Schema validation
  - Indexing for performance
  - Aggregation pipelines for analytics
  - Data relationships management
- **Collections**:
  - `users`: User accounts and credentials
  - `urls`: URL mappings and metadata
  - `clicks`: Click tracking and analytics (optional)

### Data Flow

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Browser   │ ◄─────► │  React App   │ ◄─────► │  Vite Dev   │
│   (User)    │  HTTPS  │  (Frontend)  │   HMR   │   Server    │
└─────────────┘         └──────────────┘         └─────────────┘
                               │
                               │ HTTP/HTTPS
                               │ (Axios)
                               ▼
                        ┌──────────────┐
                        │  Express.js  │
                        │   REST API   │
                        │  (Backend)   │
                        └──────────────┘
                               │
                    ┌──────────┼──────────┐
                    │          │          │
                    ▼          ▼          ▼
            ┌──────────┐ ┌─────────┐ ┌─────────┐
            │   Auth   │ │   URL   │ │ Health  │
            │Middleware│ │ Routes  │ │ Metrics │
            └──────────┘ └─────────┘ └─────────┘
                               │
                               │ Mongoose
                               ▼
                        ┌──────────────┐
                        │   MongoDB    │
                        │   Database   │
                        └──────────────┘
```

### Database Schema

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: 
- `email` (unique)
- `createdAt` (for sorting)

#### URLs Collection
```javascript
{
  _id: ObjectId,
  originalUrl: String (required),
  shortUrl: String (unique, required, indexed),
  userId: ObjectId (ref: 'User', required),
  clicks: Number (default: 0),
  isPasswordProtected: Boolean (default: false),
  password: String (hashed, optional),
  passwordAttempts: Number (default: 0),
  isActive: Boolean (default: true),
  expiresAt: Date (optional),
  createdAt: Date,
  updatedAt: Date,
  clickHistory: [{
    timestamp: Date,
    ip: String,
    userAgent: String,
    referrer: String
  }]
}
```

**Indexes**:
- `shortUrl` (unique)
- `userId` (for user queries)
- `createdAt` (for sorting)
- `isActive` (for filtering)

### Request Flow Example

**Creating a Short URL:**

1. **User Action**: User enters URL in frontend form
2. **Frontend Validation**: React validates input format
3. **API Request**: Axios sends POST to `/api/shorten` with JWT token
4. **Authentication**: Express middleware validates JWT token
5. **Authorization**: Verify user owns the resource
6. **Business Logic**: Controller generates unique short code
7. **Database**: Mongoose saves URL document to MongoDB
8. **Response**: API returns short URL data
9. **UI Update**: React updates state and displays result

**Redirecting Short URL:**

1. **User Action**: User visits `/:shortUrl`
2. **API Request**: GET request to backend
3. **Database Query**: Find URL by short code
4. **Validation**: Check if URL is active and not expired
5. **Password Check**: If protected, verify password
6. **Analytics**: Increment click count, log metadata
7. **Redirect**: 302 redirect to original URL

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 6.x or higher (comes with Node.js)
- **MongoDB** 6.x or higher ([Download](https://www.mongodb.com/try/download/community)) OR MongoDB Atlas account
- **Git** ([Download](https://git-scm.com/downloads))
- **Docker** (optional, for containerized deployment) ([Download](https://www.docker.com/get-started))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/SWETANKSINHA23/locknlink_main.git
cd locknlink_main
```

2. **Install dependencies**

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Or use the convenience script
npm run install-deps
```

### Environment Configuration

1. **Create environment file**

```bash
cp .env.example .env
```

2. **Configure environment variables**

Edit the `.env` file with your configuration:

```env
# Backend Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
MONGODB_URI=mongodb://localhost:27017/locknlink
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/locknlink?retryWrites=true&w=majority
PORT=5000

# Frontend Configuration (optional)
VITE_API_URL=http://localhost:5000
```

**Important Security Notes:**
- Never commit `.env` files to version control
- Use strong, random JWT secrets (32+ characters)
- Rotate secrets regularly in production
- Use environment-specific configurations

3. **MongoDB Setup**

**Option A: Local MongoDB**
```bash
# Start MongoDB service
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string and update `MONGODB_URI` in `.env`

### Running Locally

**Development Mode (Recommended)**

```bash
# From project root - starts both backend and frontend
npm run dev
```

This will start:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173 (Vite dev server)
- **API Docs**: http://localhost:5000/api-docs

**Individual Services**

```bash
# Backend only
npm run server

# Frontend only
npm run client
```

**Production Build**

```bash
# Build frontend
cd frontend
npm run build

# Start backend (serves built frontend)
cd ../backend
npm start
```

---

## 🐳 Docker Deployment

### Quick Start with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

**Services Started:**
- **MongoDB**: Port 27017 (internal)
- **Backend**: Port 5000
- **Frontend**: Port 3000

### Individual Container Builds

**Backend**
```bash
cd backend
docker build -t locknlink-backend .
docker run -p 5000:5000 --env-file ../.env locknlink-backend
```

**Frontend**
```bash
cd frontend
docker build -t locknlink-frontend .
docker run -p 3000:80 locknlink-frontend
```

### Monitoring Stack

```bash
# Start Prometheus and Grafana
docker-compose -f docker-compose.monitoring.yml up -d
```

Access:
- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090

---

## 📚 API Documentation

### Interactive Documentation

Access the interactive Swagger UI documentation:

**URL**: http://localhost:5000/api-docs

### Key Endpoints

#### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

#### URL Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/shorten` | Create short URL | Yes |
| GET | `/api/urls` | Get user's URLs | Yes |
| PUT | `/api/toggle/:urlId` | Toggle URL active status | Yes |
| PUT | `/api/reset-attempts/:urlId` | Reset password attempts | Yes |
| POST | `/api/verify-password` | Verify URL password | No |
| GET | `/:shortUrl` | Redirect to original URL | No |

#### Health & Metrics

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | No |
| GET | `/metrics` | Prometheus metrics | No |

### Example Requests

**Register User**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123"
  }'
```

**Create Short URL**
```bash
curl -X POST http://localhost:5000/api/shorten \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "originalUrl": "https://www.example.com/very/long/url",
    "alias": "mylink"
  }'
```

---

## 🧪 Testing

### Running Tests

**All Tests**
```bash
# Backend tests
cd backend
npm test
npm run test:coverage

# Frontend tests
cd frontend
npm test
npm run coverage

# E2E tests (from root)
npm run test:e2e
```

**Test Coverage Requirements**
- Backend: Minimum 80% coverage
- Frontend: Minimum 75% coverage

### Test Suites

#### Backend Tests (Jest + Supertest)

```bash
# Unit tests
npm test -- --testPathPattern=unit

# Integration tests
npm test -- --testPathPattern=integration

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

**Test Files:**
- `tests/unit/middleware.test.js` - Authentication middleware
- `tests/integration/auth.test.js` - Auth endpoints
- `tests/integration/url.test.js` - URL endpoints

#### Frontend Tests (Vitest + React Testing Library)

```bash
# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm run coverage

# UI mode
npm test -- --ui
```

**Test Files:**
- `src/components/AuthForm.test.tsx`
- `src/components/UrlShortener.test.tsx`
- `src/components/UrlList.test.tsx`
- `src/components/Analytics.test.tsx`

#### E2E Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug

# Specific browser
npx playwright test --project=chromium
```

**Test Scenarios:**
- `e2e/auth.spec.ts` - Complete authentication flow
- `e2e/url-shortening.spec.ts` - URL creation and management
- `e2e/analytics.spec.ts` - Analytics dashboard

#### Performance Tests (k6)

```bash
# URL shortening load test
k6 run load-test/url-shortening-load.js

# Redirect performance test
k6 run load-test/redirect-load.js

# Concurrent users test
k6 run load-test/concurrent-users.js
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

The project includes 6 automated workflows:

#### 1. Backend CI (`backend-ci.yml`)
- **Triggers**: Push/PR to main (paths: `backend/**`)
- **Jobs**:
  - Lint with ESLint
  - Run tests with coverage
  - Upload coverage to Codecov
  - Test Docker build

#### 2. Frontend CI (`frontend-ci.yml`)
- **Triggers**: Push/PR to main (paths: `frontend/**`)
- **Jobs**:
  - Lint with ESLint
  - TypeScript type checking
  - Run tests with coverage
  - Build production bundle
  - Check bundle size (max 5MB)

#### 3. E2E Tests (`e2e-tests.yml`)
- **Triggers**: Push to main, manual dispatch
- **Jobs**:
  - Start services with docker-compose
  - Run Playwright tests
  - Upload artifacts on failure

#### 4. Docker Build & Push (`docker-build-push.yml`)
- **Triggers**: Push to main, release tags
- **Jobs**:
  - Build multi-platform images
  - Push to GitHub Container Registry
  - Trivy security scanning

#### 5. Performance Tests (`performance-tests.yml`)
- **Triggers**: Push to main, weekly schedule
- **Jobs**:
  - Run k6 load tests
  - Performance benchmarking

#### 6. Security Scanning (`security-scan.yml`)
- **Triggers**: Push/PR to main, weekly schedule
- **Jobs**:
  - npm audit
  - Docker image scanning
  - OWASP dependency check

#### 7. CodeQL Analysis (`codeql-analysis.yml`)
- **Triggers**: Push/PR to main, weekly schedule
- **Jobs**:
  - Code security analysis
  - Vulnerability detection

### Deployment

**Automated Deployment:**
- Pushing to `main` triggers all CI checks
- After passing, Docker images are built and pushed to GHCR
- Images tagged with commit SHA and `latest`

**Manual Deployment:**
```bash
# Pull latest images
docker pull ghcr.io/SWETANKSINHA23/locknlink_main/backend:latest
docker pull ghcr.io/SWETANKSINHA23/locknlink_main/frontend:latest

# Run with docker-compose
docker-compose up -d
```

---

## 📊 Monitoring & Health Checks

### Health Endpoints

**Comprehensive Health Check**
```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-05T14:00:00.000Z",
  "uptime": 3600,
  "checks": {
    "mongodb": {
      "status": "healthy",
      "state": "connected"
    },
    "jwtSecret": {
      "status": "configured"
    },
    "memory": {
      "heapUsed": "45MB",
      "heapTotal": "60MB",
      "rss": "120MB"
    }
  },
  "responseTime": "15ms"
}
```

**Prometheus Metrics**
```bash
curl http://localhost:5000/metrics
```

### Monitoring Stack

**Start Monitoring Services:**
```bash
docker-compose -f docker-compose.monitoring.yml up -d
```

**Access Dashboards:**
- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090

**Available Metrics:**
- HTTP request duration
- URL shortening rate
- Redirect count
- Memory usage
- CPU usage
- Database connection status

---

## 🔒 Security

### Security Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **CORS Protection** - Configured cross-origin policies
- ✅ **Input Validation** - Mongoose schema validation
- ✅ **SQL Injection Prevention** - MongoDB NoSQL database
- ✅ **XSS Protection** - React's built-in escaping
- ✅ **Environment Variables** - Secrets not in code
- ✅ **HTTPS Ready** - SSL/TLS support
- ✅ **Rate Limiting Ready** - Infrastructure in place
- ✅ **Security Headers** - Helmet.js ready

### Security Scanning

**Automated Scans:**
- npm audit (weekly)
- Trivy Docker scanning
- CodeQL code analysis
- OWASP dependency check
- Dependabot updates

**Manual Security Audit:**
```bash
# Backend dependencies
cd backend && npm audit

# Frontend dependencies
cd frontend && npm audit

# Fix vulnerabilities
npm audit fix
```

### Best Practices

1. **Never commit `.env` files**
2. **Use strong JWT secrets** (32+ characters)
3. **Rotate secrets regularly**
4. **Keep dependencies updated**
5. **Review Dependabot PRs promptly**
6. **Monitor security advisories**
7. **Use HTTPS in production**
8. **Implement rate limiting**
9. **Regular security audits**
10. **Follow OWASP guidelines**

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Start

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit using conventional commits (`git commit -m 'feat: add amazing feature'`)
6. Push to your fork (`git push origin feat/amazing-feature`)
7. Open a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

### Code Quality

- All tests must pass
- Code coverage must meet thresholds
- ESLint and Prettier checks must pass
- TypeScript must compile without errors
- Pre-commit hooks will enforce these

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing UI library
- **Express.js** - For the robust web framework
- **MongoDB** - For the flexible database
- **Docker** - For containerization technology
- **GitHub Actions** - For CI/CD automation
- **Playwright** - For reliable E2E testing
- **Open Source Community** - For countless libraries and tools

---

## 📞 Support

- **Documentation**: [Full Documentation](./ARCHITECTURE.md)
- **Issues**: [GitHub Issues](https://github.com/SWETANKSINHA23/locknlink_main/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SWETANKSINHA23/locknlink_main/discussions)

---

**Made with ❤️ by Swetank**

⭐ Star this repo if you find it helpful!