# Architecture Documentation

## System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
    end
    
    subgraph "Frontend - React/Vite"
        B[React App]
        C[Components]
        D[State Management]
    end
    
    subgraph "Backend - Node.js/Express"
        E[API Gateway]
        F[Auth Middleware]
        G[Controllers]
        H[Services]
    end
    
    subgraph "Data Layer"
        I[(MongoDB)]
    end
    
    subgraph "Monitoring"
        J[Prometheus]
        K[Grafana]
    end
    
    A -->|HTTP/HTTPS| B
    B --> C
    C --> D
    B -->|API Calls| E
    E --> F
    F --> G
    G --> H
    H -->|Queries| I
    E -->|Metrics| J
    J --> K
```

## Docker Services Architecture

```mermaid
graph LR
    subgraph "Docker Network: locknlink-network"
        A[Frontend Container<br/>Nginx:Alpine<br/>Port 3000]
        B[Backend Container<br/>Node:18<br/>Port 5000]
        C[MongoDB Container<br/>Mongo:Latest<br/>Port 27017]
    end
    
    D[User] -->|HTTP| A
    A -->|Proxy /api| B
    B -->|MongoDB Protocol| C
    C -->|Persistent Volume| E[(mongo-data)]
```

## Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as MongoDB
    
    U->>F: Visit URL
    F->>B: POST /api/auth/login
    B->>DB: Verify credentials
    DB-->>B: User data
    B-->>F: JWT Token
    F->>F: Store token
    
    U->>F: Create short URL
    F->>B: POST /api/shorten (with JWT)
    B->>B: Validate token
    B->>DB: Save URL
    DB-->>B: URL document
    B-->>F: Short URL
    F-->>U: Display result
    
    U->>B: GET /:shortUrl
    B->>DB: Find URL
    DB-->>B: Original URL
    B->>DB: Increment clicks
    B-->>U: 302 Redirect
```

## CI/CD Pipeline

```mermaid
graph TD
    A[Git Push] --> B{Branch?}
    B -->|Feature/PR| C[Backend CI]
    B -->|Feature/PR| D[Frontend CI]
    B -->|Main| E[E2E Tests]
    
    C --> C1[Lint]
    C --> C2[Unit Tests]
    C --> C3[Docker Build]
    
    D --> D1[Lint]
    D --> D2[Type Check]
    D --> D3[Unit Tests]
    D --> D4[Build]
    
    E --> E1[Docker Compose Up]
    E --> E2[Playwright Tests]
    E --> E3[Tear Down]
    
    B -->|Main + Tests Pass| F[Build Images]
    F --> G[Push to GHCR]
    F --> H[Trivy Scan]
    
    G --> I[Deploy to Production]
```

## Monitoring Architecture

```mermaid
graph LR
    A[Backend /metrics] -->|Scrape| B[Prometheus]
    C[Node Exporter] -->|System Metrics| B
    B -->|Query| D[Grafana]
    E[Backend /health] -->|Health Checks| F[K8s Probes]
    D -->|Alerts| G[Alert Manager]
```

## Component Breakdown

### Frontend Components
- **AuthForm**: User authentication
- **UrlShortener**: URL creation interface
- **UrlList**: Display user's URLs
- **Analytics**: Dashboard with metrics

### Backend Routes
- **/api/auth**: Authentication endpoints
- **/api/shorten**: URL shortening
- **/api/urls**: User URL management
- **/:shortUrl**: Redirect handler

### Database Schema

**Users Collection:**
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

**URLs Collection:**
```javascript
{
  _id: ObjectId,
  originalUrl: String,
  shortUrl: String (unique),
  userId: ObjectId (ref: User),
  clicks: Number,
  isPasswordProtected: Boolean,
  password: String (hashed, optional),
  passwordAttempts: Number,
  isActive: Boolean,
  createdAt: Date
}
```

## Security Layers

1. **Network**: CORS, Rate Limiting
2. **Authentication**: JWT tokens
3. **Authorization**: User-specific resources
4. **Data**: Password hashing (bcrypt)
5. **Infrastructure**: Docker isolation, K8s network policies
