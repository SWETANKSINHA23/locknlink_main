# Locknlink - URL Shortener

[![Build Status](https://img.shields.io/github/actions/workflow/status/SWETANKSINHA23/locknlink_main/backend-ci.yml?branch=main&label=Backend%20CI)](https://github.com/SWETANKSINHA23/locknlink_main/actions)
[![Frontend CI](https://img.shields.io/github/actions/workflow/status/SWETANKSINHA23/locknlink_main/frontend-ci.yml?branch=main&label=Frontend%20CI)](https://github.com/SWETANKSINHA23/locknlink_main/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Enterprise-grade URL shortener with JWT authentication, real-time analytics, and modern DevOps practices.

## ✨ Features

- 🔗 URL shortening with custom aliases
- 🔐 JWT-based authentication
- 📊 Real-time click analytics
- 🔒 Password-protected URLs
- 📱 Responsive design
- 🐳 Docker support
- ✅ Comprehensive testing (80%+ coverage)

## 🛠 Tech Stack

**Frontend:** React 18, TypeScript, Vite  
**Backend:** Node.js 18, Express, MongoDB  
**DevOps:** Docker, GitHub Actions, Playwright, k6  
**Testing:** Jest, Vitest, Playwright  
**Monitoring:** Prometheus, Grafana

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Docker (optional)

### Installation

```bash
# Clone repository
git clone https://github.com/SWETANKSINHA23/locknlink_main.git
cd locknlink_main

# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install

# Setup environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Run development servers
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Docs: http://localhost:5000/api-docs

### Docker Deployment

```bash
docker-compose up --build
```

## 📝 Environment Variables

```env
JWT_SECRET=your_secret_key_here
MONGODB_URI=mongodb://localhost:27017/locknlink
PORT=5000
```

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# E2E tests
npm run test:e2e

# Performance tests
k6 run load-test/url-shortening-load.js
```

## 📚 API Documentation

Interactive API documentation available at `/api-docs` when running the server.

**Key Endpoints:**
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/shorten` - Create short URL
- `GET /api/urls` - Get user's URLs
- `GET /:shortUrl` - Redirect to original URL

## 🏗 Project Structure

```
├── backend/          # Node.js/Express API
├── frontend/         # React application
├── e2e/             # Playwright tests
├── load-test/       # k6 performance tests
├── k8s/             # Kubernetes manifests
├── monitoring/      # Prometheus & Grafana
└── .github/         # CI/CD workflows
```

## 🔒 Security

- JWT authentication
- Password hashing (bcrypt)
- CORS protection
- Automated security scanning (Trivy, CodeQL)
- Dependabot updates

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/SWETANKSINHA23/locknlink_main/issues)
- **Documentation**: [Full Docs](./ARCHITECTURE.md)

---

**Made with ❤️ by Swetank**

⭐ Star this repo if you find it helpful!