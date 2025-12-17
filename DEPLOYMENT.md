# Deployment Guide

This guide covers deploying the URL Shortener application to production environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Docker Deployment](#docker-deployment)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Monitoring Setup](#monitoring-setup)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+ (for Docker deployment)
- Kubernetes 1.24+ (for K8s deployment)
- kubectl configured
- Domain name (optional, for production)
- SSL certificate (recommended)

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Required
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=mongodb://mongodb:27017/locknlink
PORT=5000

# Optional
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

### Security Best Practices

- **Never commit `.env` files**
- Use strong, random JWT secrets (32+ characters)
- Rotate secrets regularly
- Use environment-specific configurations

## Docker Deployment

### Single Server Deployment

1. **Clone the repository**
   ```bash
   git clone https://github.com/SWETANKSINHA23/locknlink_main.git
cd locknlink_main
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   nano .env
   ```

3. **Build and start services**
   ```bash
   docker-compose up -d --build
   ```

4. **Verify deployment**
   ```bash
   docker-compose ps
   curl http://localhost:5000/health
   ```

### Production Docker Compose

For production, use optimized configuration:

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    restart: always
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    networks:
      - backend

  backend:
    image: ghcr.io/SWETANKSINHA23/locknlink_main/backend:latest
    restart: always
    environment:
      NODE_ENV: production
      JWT_SECRET: ${JWT_SECRET}
      MONGODB_URI: ${MONGODB_URI}
    depends_on:
      - mongodb
    networks:
      - backend
      - frontend

  frontend:
    image: ghcr.io/SWETANKSINHA23/locknlink_main/frontend:latest
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - backend
    networks:
      - frontend

networks:
  backend:
  frontend:

volumes:
  mongo-data:
```

Deploy:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Kubernetes Deployment

### 1. Create Secrets

```bash
# Create namespace
kubectl create namespace url-shortener

# Create secrets
kubectl create secret generic backend-secrets \
  --from-literal=jwt-secret='your-jwt-secret' \
  --from-literal=mongodb-uri='mongodb://mongodb-service:27017/locknlink' \
  -n url-shortener

kubectl create secret generic mongodb-secrets \
  --from-literal=username='admin' \
  --from-literal=password='secure-password' \
  -n url-shortener
```

### 2. Deploy MongoDB

```bash
kubectl apply -f k8s/mongodb-statefulset.yml -n url-shortener
```

### 3. Deploy Backend

```bash
kubectl apply -f k8s/backend-deployment.yml -n url-shortener
```

### 4. Deploy Frontend

```bash
kubectl apply -f k8s/frontend-deployment.yml -n url-shortener
```

### 5. Verify Deployment

```bash
# Check pods
kubectl get pods -n url-shortener

# Check services
kubectl get svc -n url-shortener

# Check logs
kubectl logs -f deployment/backend -n url-shortener
```

### 6. Expose Services

For production, use an Ingress controller:

```yaml
# ingress.yml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: url-shortener-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - yourdomain.com
    secretName: url-shortener-tls
  rules:
  - host: yourdomain.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 5000
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
```

Apply:
```bash
kubectl apply -f ingress.yml -n url-shortener
```

## Monitoring Setup

### Deploy Monitoring Stack

```bash
# Start Prometheus and Grafana
docker-compose -f docker-compose.monitoring.yml up -d

# Or in Kubernetes
kubectl apply -f k8s/monitoring/
```

### Access Dashboards

- **Grafana**: http://your-domain:3001 (admin/admin)
- **Prometheus**: http://your-domain:9090

### Configure Alerts

Edit `monitoring/prometheus.yml` to add alerting rules.

## Security Considerations

### 1. SSL/TLS

Use Let's Encrypt for free SSL certificates:

```bash
# Install certbot
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com
```

### 2. Firewall Rules

```bash
# Allow only necessary ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 3. Database Security

- Use strong passwords
- Enable MongoDB authentication
- Restrict network access
- Regular backups

### 4. Rate Limiting

Add rate limiting to prevent abuse:

```javascript
// backend/server.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 5. Security Headers

```javascript
import helmet from 'helmet';
app.use(helmet());
```

## Backup and Recovery

### MongoDB Backup

```bash
# Backup
docker exec mongodb mongodump --out /backup

# Restore
docker exec mongodb mongorestore /backup
```

### Automated Backups

Set up cron job:
```bash
0 2 * * * docker exec mongodb mongodump --out /backup/$(date +\%Y\%m\%d)
```

## Scaling

### Horizontal Scaling (Kubernetes)

```bash
# Scale backend
kubectl scale deployment backend --replicas=5 -n url-shortener

# Auto-scaling
kubectl autoscale deployment backend \
  --cpu-percent=70 \
  --min=3 \
  --max=10 \
  -n url-shortener
```

### Database Scaling

For high traffic, consider:
- MongoDB replica sets
- Read replicas
- Sharding

## Troubleshooting

### Common Issues

**Service not starting:**
```bash
# Check logs
docker-compose logs backend
kubectl logs deployment/backend -n url-shortener
```

**Database connection issues:**
```bash
# Test MongoDB connection
docker exec -it mongodb mongosh
```

**High memory usage:**
```bash
# Check resource usage
docker stats
kubectl top pods -n url-shortener
```

### Health Checks

```bash
# Backend health
curl http://localhost:5000/health

# Check metrics
curl http://localhost:5000/metrics
```

## Rollback

### Docker
```bash
docker-compose down
docker-compose up -d --build
```

### Kubernetes
```bash
kubectl rollout undo deployment/backend -n url-shortener
kubectl rollout status deployment/backend -n url-shortener
```

## Support

For issues or questions:
- Check GitHub Issues
- Review logs and metrics
- Consult documentation

## Maintenance

- Regular dependency updates via Dependabot
- Security scans via GitHub Actions
- Monitor performance metrics
- Review and rotate secrets quarterly
