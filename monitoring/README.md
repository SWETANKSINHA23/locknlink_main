# Monitoring Stack

## Quick Start
```bash
# Start monitoring stack
docker-compose -f docker-compose.monitoring.yml up -d

# Access dashboards
# Grafana: http://localhost:3001 (admin/admin)
# Prometheus: http://localhost:9090
```

## Endpoints
- `/health` - Comprehensive health check
- `/metrics` - Prometheus metrics

## Kubernetes Deployment
```bash
# Apply deployments
kubectl apply -f k8s/mongodb-statefulset.yml
kubectl apply -f k8s/backend-deployment.yml
kubectl apply -f k8s/frontend-deployment.yml
```
