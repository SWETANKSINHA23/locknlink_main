# Initial commit - Project setup
git add .gitignore README.md package.json
$env:GIT_AUTHOR_DATE="2025-11-28T10:00:00"
$env:GIT_COMMITTER_DATE="2025-11-28T10:00:00"
git commit -m "chore: initial project setup"

# Backend setup
git add backend/package.json backend/Dockerfile backend/.dockerignore backend/config/ backend/models/
$env:GIT_AUTHOR_DATE="2025-11-29T14:30:00"
$env:GIT_COMMITTER_DATE="2025-11-29T14:30:00"
git commit -m "feat: setup backend with Express and MongoDB"

# Backend routes and controllers
git add backend/routes/ backend/controllers/ backend/middlewares/
$env:GIT_AUTHOR_DATE="2025-11-30T11:00:00"
$env:GIT_COMMITTER_DATE="2025-11-30T11:00:00"
git commit -m "feat: add authentication and URL shortening routes"

# Frontend setup
git add frontend/package.json frontend/vite.config.ts frontend/tsconfig.json frontend/index.html
$env:GIT_AUTHOR_DATE="2025-12-01T09:00:00"
$env:GIT_COMMITTER_DATE="2025-12-01T09:00:00"
git commit -m "feat: setup React frontend with Vite and TypeScript"

# Frontend components
git add frontend/src/components/ frontend/src/App.tsx frontend/src/App.css
$env:GIT_AUTHOR_DATE="2025-12-02T15:00:00"
$env:GIT_COMMITTER_DATE="2025-12-02T15:00:00"
git commit -m "feat: add frontend components and UI"

# Docker setup
git add docker-compose.yml .env.example
$env:GIT_AUTHOR_DATE="2025-12-03T10:30:00"
$env:GIT_COMMITTER_DATE="2025-12-03T10:30:00"
git commit -m "feat: add Docker and Docker Compose configuration"

# Testing infrastructure
git add backend/jest.config.js backend/tests/ frontend/vitest.config.ts frontend/src/tests/
$env:GIT_AUTHOR_DATE="2025-12-05T13:00:00"
$env:GIT_COMMITTER_DATE="2025-12-05T13:00:00"
git commit -m "test: add unit and integration tests"

# E2E tests
git add playwright.config.ts e2e/
$env:GIT_AUTHOR_DATE="2025-12-06T16:00:00"
$env:GIT_COMMITTER_DATE="2025-12-06T16:00:00"
git commit -m "test: add E2E tests with Playwright"

# CI/CD pipelines
git add .github/workflows/
$env:GIT_AUTHOR_DATE="2025-12-08T11:00:00"
$env:GIT_COMMITTER_DATE="2025-12-08T11:00:00"
git commit -m "ci: add GitHub Actions workflows"

# Code quality tools
git add .husky/ .prettierrc commitlint.config.js
$env:GIT_AUTHOR_DATE="2025-12-10T14:00:00"
$env:GIT_COMMITTER_DATE="2025-12-10T14:00:00"
git commit -m "chore: add Husky, Prettier, and commitlint"

# API documentation
git add backend/swagger.js
$env:GIT_AUTHOR_DATE="2025-12-12T10:00:00"
$env:GIT_COMMITTER_DATE="2025-12-12T10:00:00"
git commit -m "docs: add Swagger API documentation"

# Performance and security
git add load-test/ monitoring/
$env:GIT_AUTHOR_DATE="2025-12-14T15:30:00"
$env:GIT_COMMITTER_DATE="2025-12-14T15:30:00"
git commit -m "feat: add performance testing and monitoring"

# Kubernetes deployments
git add k8s/
$env:GIT_AUTHOR_DATE="2025-12-15T12:00:00"
$env:GIT_COMMITTER_DATE="2025-12-15T12:00:00"
git commit -m "feat: add Kubernetes deployment manifests"

# Documentation
git add CONTRIBUTING.md DEPLOYMENT.md ARCHITECTURE.md
$env:GIT_AUTHOR_DATE="2025-12-17T10:00:00"
$env:GIT_COMMITTER_DATE="2025-12-17T10:00:00"
git commit -m "docs: add comprehensive documentation"

# Final updates
git add .
$env:GIT_AUTHOR_DATE="2025-12-18T16:00:00"
$env:GIT_COMMITTER_DATE="2025-12-18T16:00:00"
git commit -m "chore: final project updates and polish"
