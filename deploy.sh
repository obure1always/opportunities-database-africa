#!/bin/bash

# Exit on error
set -e

# Build and push Docker images
echo "Building and pushing Docker images..."

# Build and push backend
cd backend
docker build -t your-registry/opportunities-backend:latest .
docker push your-registry/opportunities-backend:latest
cd ..

# Build and push frontend
docker build -t your-registry/opportunities-frontend:latest .
docker push your-registry/opportunities-frontend:latest

# Deploy to production
echo "Deploying to production..."

# Create monitoring namespace
kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -

# Create logging namespace
kubectl create namespace logging --dry-run=client -o yaml | kubectl apply -f -

# Deploy monitoring stack
echo "Deploying monitoring stack..."
kubectl apply -f k8s/monitoring/

# Deploy logging stack
echo "Deploying logging stack..."
kubectl apply -f k8s/logging/

# Deploy application
echo "Deploying application..."
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml

# Wait for deployments to be ready
echo "Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/opportunities-frontend
kubectl wait --for=condition=available --timeout=300s deployment/opportunities-backend
kubectl wait --for=condition=available --timeout=300s deployment/prometheus -n monitoring
kubectl wait --for=condition=available --timeout=300s deployment/grafana -n monitoring
kubectl wait --for=condition=available --timeout=300s deployment/kibana -n logging

echo "Deployment completed successfully!"

# Print access information
echo "
Access URLs:
- Frontend: http://$(kubectl get service opportunities-frontend -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
- Backend API: http://$(kubectl get service opportunities-backend -o jsonpath='{.status.loadBalancer.ingress[0].ip}')/api
- Grafana: http://$(kubectl get service grafana -n monitoring -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
- Kibana: http://$(kubectl get service kibana -n logging -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
" 