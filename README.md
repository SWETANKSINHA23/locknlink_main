# Locknlink - URL Shortener

Enterprise-grade URL shortener with JWT authentication, real-time analytics, and modern DevOps practices.

## Overview

Locknlink is a full-stack URL shortening application designed with production-ready features including user authentication, password-protected URLs, real-time click analytics, and comprehensive monitoring capabilities. Built with modern web technologies and following industry best practices, the application provides a scalable solution for URL management with enterprise-level security and observability.

The platform enables users to create shortened URLs, track engagement metrics, and manage their links through an intuitive web interface. The system is containerized using Docker, includes automated CI/CD pipelines, and supports Kubernetes deployment for high-availability scenarios.

## System Architecture

The application follows a three-tier architecture pattern with clear separation of concerns:

**Client Layer**: Web browser interface providing user interaction through a React-based single-page application.

**Application Layer**:

- Frontend service running React 18 with TypeScript, built using Vite and served through Nginx
- Backend API service built with Node.js and Express, handling business logic and authentication
- JWT-based authentication middleware for secure user sessions
- RESTful API design with comprehensive Swagger documentation

**Data Layer**:

- MongoDB database for persistent storage of users and URL mappings
- Mongoose ODM for schema validation and data modeling
- Indexed collections for optimized query performance

**Infrastructure**:

- Docker containerization for all services
- Docker Compose orchestration for local development
- Kubernetes manifests for production deployment
- Prometheus and Grafana for metrics collection and visualization
- GitHub Actions for automated CI/CD pipelines

The services communicate over a dedicated Docker network with health checks and automatic restart policies. The backend exposes metrics endpoints for monitoring, and the frontend proxies API requests to maintain CORS compliance.

## Database Schema

The application uses MongoDB as its primary database with two main collections: Users and URLs. The schema is designed to support user authentication, URL management, and analytics tracking.

```mermaid
erDiagram
    User ||--o{ URL : creates

    User {
        ObjectId _id PK "Primary Key - Auto-generated"
        string email UK "Unique, lowercase, trimmed"
        string password "Hashed with bcrypt, min 6 chars"
        timestamp createdAt "Auto-generated on creation"
        timestamp updatedAt "Auto-updated on modification"
    }

    URL {
        ObjectId _id PK "Primary Key - Auto-generated"
        string originalUrl "Required - Full URL to redirect to"
        string shortUrl UK "Unique - Short identifier"
        ObjectId userId FK "Foreign Key - References User._id"
        number clicks "Default 0 - Total click count"
        boolean isPasswordProtected "Default false"
        string password "Optional - Hashed with bcrypt"
        number passwordAttempts "Default 0 - Failed attempt counter"
        boolean isActive "Default true - Enable/disable link"
        timestamp createdAt "Auto-generated on creation"
        timestamp updatedAt "Auto-updated on modification"
    }
```

**Schema Details:**

**User Collection**

- Primary identifier using MongoDB ObjectId
- Email field enforced as unique with database index
- Passwords hashed using bcrypt with salt rounds before storage
- Automatic timestamp tracking for audit purposes
- Email validation ensures lowercase and trimmed values

**URL Collection**

- Primary identifier using MongoDB ObjectId
- Short URL enforced as unique with database index for fast lookups
- Foreign key relationship to User collection via userId
- Click tracking with atomic increment operations
- Password protection optional with separate hashed password field
- Password attempt tracking for brute-force prevention
- Active status flag for soft deletion and link management
- Automatic timestamp tracking for creation and updates

**Indexes:**

- User.email: Unique index for authentication lookups
- URL.shortUrl: Unique index for redirect performance
- URL.userId: Non-unique index for user URL queries

**Relationships:**

- One User can create many URLs (one-to-many)
- Each URL belongs to exactly one User
- Cascade behavior: URLs remain if User is deleted (configurable)

## Features

- URL shortening with custom alias support
- JWT-based user authentication and authorization
- Real-time click tracking and analytics dashboard
- Password-protected URL functionality
- QR code generation for shortened URLs
- Responsive web design for mobile and desktop
- RESTful API with Swagger documentation
- Health check endpoints for monitoring
- Prometheus metrics integration
- Automated security scanning with Trivy and CodeQL
- Comprehensive test coverage with unit, integration, and E2E tests
- Rate limiting and CORS protection
- Docker and Kubernetes deployment support

## Technology Stack

**Frontend**

- React 18.x
- TypeScript 5.x
- Vite 7.x for build tooling
- Vitest for unit testing
- React Testing Library for component testing
- QRCode.js for QR code generation
- Nginx for production serving

**Backend**

- Node.js 18.x
- Express 4.x
- MongoDB with Mongoose ODM
- JSON Web Tokens for authentication
- Bcrypt for password hashing
- Swagger for API documentation
- Prom-client for Prometheus metrics
- Jest for unit and integration testing
- Supertest for API testing

**DevOps and Infrastructure**

- Docker and Docker Compose
- Kubernetes with StatefulSets and Deployments
- GitHub Actions for CI/CD
- Playwright for end-to-end testing
- k6 for load testing
- Prometheus for metrics collection
- Grafana for visualization
- Trivy for container security scanning
- Husky for Git hooks
- Prettier and ESLint for code quality

## Project Structure

```
locknlink/
├── backend/                    # Node.js/Express API server
│   ├── config/                # Database and environment configuration
│   ├── controllers/           # Request handlers for routes
│   ├── middlewares/           # Authentication and error handling
│   ├── models/                # Mongoose schemas (User, URL)
│   ├── routes/                # API route definitions
│   ├── tests/                 # Jest unit and integration tests
│   ├── utils/                 # Helper functions and utilities
│   ├── server.js              # Application entry point
│   ├── swagger.js             # API documentation configuration
│   └── Dockerfile             # Backend container definition
├── frontend/                  # React application
│   ├── src/                   # Source code
│   │   ├── components/        # React components
│   │   ├── services/          # API client services
│   │   └── App.tsx            # Main application component
│   ├── public/                # Static assets
│   ├── nginx.conf             # Nginx configuration for production
│   ├── vite.config.ts         # Vite build configuration
│   └── Dockerfile             # Frontend container definition
├── e2e/                       # Playwright end-to-end tests
├── load-test/                 # k6 performance testing scripts
├── k8s/                       # Kubernetes deployment manifests
│   ├── backend-deployment.yml
│   ├── frontend-deployment.yml
│   └── mongodb-statefulset.yml
├── monitoring/                # Prometheus and Grafana configuration
├── .github/                   # GitHub Actions workflows
│   └── workflows/
│       ├── backend-ci.yml     # Backend testing and building
│       ├── frontend-ci.yml    # Frontend testing and building
│       └── e2e-tests.yml      # End-to-end test automation
├── docker-compose.yml         # Local development orchestration
└── docker-compose.monitoring.yml  # Monitoring stack

```

## Installation & Setup

### Prerequisites

- Node.js 18.0 or higher
- npm 6.0 or higher
- MongoDB 5.0 or higher (local installation or MongoDB Atlas account)
- Docker 20.10 or higher (optional, for containerized deployment)
- Docker Compose 2.0 or higher (optional)

### Local Development Setup

**Step 1: Clone the Repository**

```bash
git clone https://github.com/SWETANKSINHA23/locknlink_main.git
cd locknlink_main
```

**Step 2: Install Dependencies**

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root directory
cd ..
```

Alternatively, use the convenience script:

```bash
npm run install-deps
```

**Step 3: Configure Environment Variables**

Create a `.env` file in the root directory and populate it with the required variables.

Edit the `.env` file with your configuration:

```env
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=mongodb://localhost:27017/locknlink
PORT=5000
```

**Step 4: Start Development Servers**

```bash
# Start both frontend and backend concurrently
npm run dev
```

Or start them separately:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

**Step 5: Access the Application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api-docs
- Health Check: http://localhost:5000/health

### Docker Deployment

**Step 1: Configure Environment**

Ensure your `.env` file is properly configured with Docker-compatible settings:

```env
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=mongodb://mongodb:27017/locknlink
PORT=5000
```

**Step 2: Build and Start Services**

```bash
docker-compose up --build
```

For detached mode:

```bash
docker-compose up -d --build
```

**Step 3: Verify Deployment**

```bash
# Check running containers
docker-compose ps

# View logs
docker-compose logs -f

# Test backend health
curl http://localhost:5000/health
```

**Step 4: Access the Application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

**Step 5: Stop Services**

```bash
docker-compose down
```

To remove volumes as well:

```bash
docker-compose down -v
```

## Usage Guidelines

### User Registration and Authentication

1. Navigate to the application homepage
2. Click on the registration link to create a new account
3. Provide a valid email address and secure password
4. Upon successful registration, log in with your credentials
5. The system will issue a JWT token stored in browser local storage

### Creating Shortened URLs

1. After authentication, access the URL shortener interface
2. Enter the original URL you wish to shorten
3. Optionally specify a custom alias for the short URL
4. Optionally enable password protection and set a password
5. Click the create button to generate the shortened URL
6. The system will display the shortened URL and QR code

### Managing URLs

1. Access the dashboard to view all your created URLs
2. View click statistics and analytics for each URL
3. Toggle URL active status to enable or disable redirection
4. Delete URLs that are no longer needed
5. Copy shortened URLs to clipboard for sharing

### Accessing Shortened URLs

1. Share the shortened URL with others
2. When accessed, the system increments the click counter
3. If password-protected, users must enter the correct password
4. The system redirects to the original URL upon successful validation
5. Click data is recorded for analytics purposes

### API Usage

The application provides a RESTful API for programmatic access. Refer to the Swagger documentation at `/api-docs` for detailed endpoint information.

**Authentication Endpoints:**

- `POST /api/auth/register` - Register a new user account
- `POST /api/auth/login` - Authenticate and receive JWT token

**URL Management Endpoints:**

- `POST /api/shorten` - Create a new shortened URL (requires authentication)
- `GET /api/urls` - Retrieve all URLs for authenticated user
- `GET /api/urls/:id` - Get specific URL details
- `DELETE /api/urls/:id` - Delete a URL (requires authentication)
- `PATCH /api/urls/:id` - Update URL properties

**Redirect Endpoint:**

- `GET /:shortUrl` - Redirect to original URL and track analytics

## Detailed Features

### URL Shortening Algorithm

The application uses a custom short URL generation algorithm that creates unique, collision-resistant identifiers. The system generates a random alphanumeric string and verifies uniqueness against the database before assignment. Custom aliases are validated for availability and format compliance.

### Authentication System

JWT-based authentication provides stateless session management. Upon successful login, the server issues a signed token containing the user ID and expiration timestamp. The token must be included in the Authorization header for protected endpoints. The authentication middleware validates tokens and extracts user information for request processing.

### Password Protection

URLs can be optionally protected with passwords. The system uses bcrypt hashing with salt rounds to securely store password hashes. When accessing a protected URL, users must provide the correct password. The system implements attempt limiting to prevent brute-force attacks, temporarily locking URLs after multiple failed attempts.

### Analytics and Tracking

The application tracks comprehensive analytics for each shortened URL including total click count, timestamp of each access, and referrer information. The click history is stored as an embedded array in the URL document, enabling detailed analysis of usage patterns. The dashboard presents aggregated statistics and visualizations.

### QR Code Generation

Each shortened URL automatically generates an associated QR code using the QRCode.js library. The QR codes are rendered as SVG or canvas elements and can be downloaded for offline sharing. This feature facilitates mobile access and physical media distribution.

### Health Monitoring

The backend exposes health check endpoints that report service status and database connectivity. Kubernetes liveness and readiness probes utilize these endpoints to manage pod lifecycle. The health check includes MongoDB connection verification and memory usage reporting.

### Metrics Collection

Prometheus metrics are exposed at the `/metrics` endpoint, providing insights into request rates, response times, error rates, and resource utilization. Custom metrics track URL creation rates, redirect performance, and authentication success rates. Grafana dashboards visualize these metrics for operational monitoring.

### Security Features

The application implements multiple security layers including CORS configuration, input validation, SQL injection prevention through Mongoose ODM, XSS protection via React's built-in escaping, and rate limiting on authentication endpoints. Passwords are hashed using bcrypt with configurable salt rounds. JWT tokens have configurable expiration times.

### Testing Infrastructure

The codebase includes comprehensive test coverage across multiple levels. Backend unit tests use Jest with MongoDB Memory Server for isolated database testing. Frontend component tests utilize Vitest and React Testing Library. Integration tests verify API endpoint behavior. Playwright E2E tests validate complete user workflows. k6 load tests assess performance under concurrent load.

## Detailed Environment Variables

### Required Variables

**JWT_SECRET**

- Description: Secret key used for signing and verifying JSON Web Tokens
- Type: String
- Example: `your_super_secret_jwt_key_change_this_in_production`
- Security: Must be a strong, random string of at least 32 characters
- Usage: Used by jsonwebtoken library for token generation and validation

**MONGODB_URI**

- Description: MongoDB connection string for database access
- Type: String (MongoDB URI format)
- Example (Local): `mongodb://localhost:27017/locknlink`
- Example (Docker): `mongodb://mongodb:27017/locknlink`
- Example (Atlas): `mongodb+srv://username:password@cluster.mongodb.net/locknlink`
- Usage: Mongoose uses this to establish database connection

**PORT**

- Description: Port number on which the backend server listens
- Type: Number
- Default: `5000`
- Example: `5000`
- Usage: Express server binds to this port

### Optional Variables

**NODE_ENV**

- Description: Specifies the runtime environment
- Type: String
- Values: `development`, `production`, `test`
- Default: `development`
- Usage: Affects logging verbosity, error handling, and optimization

**CORS_ORIGIN**

- Description: Allowed origins for Cross-Origin Resource Sharing
- Type: String or Array
- Example: `https://yourdomain.com`
- Default: `*` (all origins in development)
- Usage: CORS middleware configuration

**MONGO_INITDB_ROOT_USERNAME**

- Description: MongoDB root username for authentication
- Type: String
- Usage: Docker MongoDB container initialization

**MONGO_INITDB_ROOT_PASSWORD**

- Description: MongoDB root password for authentication
- Type: String
- Usage: Docker MongoDB container initialization

### Environment-Specific Configuration

**Development Environment:**

```env
NODE_ENV=development
JWT_SECRET=dev_secret_key_not_for_production
MONGODB_URI=mongodb://localhost:27017/locknlink
PORT=5000
```

**Production Environment:**

```env
NODE_ENV=production
JWT_SECRET=<strong-random-secret-minimum-32-characters>
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/locknlink
PORT=5000
CORS_ORIGIN=https://yourdomain.com
```

**Docker Environment:**

```env
NODE_ENV=production
JWT_SECRET=<strong-random-secret>
MONGODB_URI=mongodb://mongodb:27017/locknlink
PORT=5000
```

**Testing Environment:**

```env
NODE_ENV=test
JWT_SECRET=test_secret_key
MONGODB_URI=mongodb://localhost:27017/locknlink_test
PORT=5001
```

## Engineering Challenges And Solutions

### Challenge 1: Short URL Collision Prevention

**Problem**: Generating unique short URLs at scale while maintaining brevity presented a collision risk. Random generation could produce duplicate identifiers, especially as the database grows.

**Solution**: Implemented a retry mechanism with collision detection. The system generates a random alphanumeric string, queries the database for existence, and regenerates if a collision is detected. Added a unique index on the shortUrl field in MongoDB to enforce database-level uniqueness. For high-volume scenarios, the algorithm uses a configurable length parameter to adjust the keyspace size, balancing URL brevity with collision probability.

### Challenge 2: Database Connection Management in Containerized Environment

**Problem**: MongoDB connection timing issues in Docker Compose where the backend service would start before MongoDB was ready to accept connections, causing application crashes.

**Solution**: Implemented health checks in Docker Compose configuration with service dependencies. The MongoDB container includes a health check that verifies database readiness. The backend service uses `depends_on` with `condition: service_healthy` to ensure MongoDB is fully operational before starting. Added connection retry logic in the backend with exponential backoff to handle transient connection failures gracefully.

### Challenge 3: Frontend-Backend Communication in Docker

**Problem**: CORS issues and network routing complexities when running frontend and backend in separate containers. Direct localhost references from the browser failed in containerized environments.

**Solution**: Configured Nginx in the frontend container to proxy API requests to the backend service using Docker network DNS resolution. The nginx.conf includes proxy_pass directives that route `/api` requests to the backend container by service name. This approach eliminates CORS issues and provides a unified origin for the application. Environment-specific API base URLs are configured through build-time variables.

### Challenge 4: Security Vulnerability Management

**Problem**: Keeping dependencies updated and addressing security vulnerabilities in a timely manner across multiple packages.

**Solution**: Enabled GitHub Dependabot for automated dependency updates with pull requests. Integrated Trivy container scanning in CI/CD pipelines to detect vulnerabilities in Docker images. Configured CodeQL analysis for static code security scanning. Implemented automated security testing in the CI pipeline that fails builds if high-severity vulnerabilities are detected. Established a regular review process for dependency updates and security patches.
