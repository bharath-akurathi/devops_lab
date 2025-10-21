#!/bin/bash

# Build Docker image locally
docker build -t event-app:1.0 .

# Load the image into Minikube
minikube image load event-app:1.0

# Deploy to Kubernetes
kubectl apply -f k8s.yaml

# Show pods and services
kubectl get pods
kubectl get svc

# Open the service in the browser
minikube service event-app-service
