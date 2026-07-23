# Satiety AI

An AI-powered nutrition assistant that helps users analyze meals, track conversations, and receive personalized dietary guidance.

This project demonstrates a complete containerized deployment using **Docker**, **Kubernetes (Minikube)**, **Ingress**, **ConfigMaps**, and **Secrets**, making it production-ready from an infrastructure perspective.

---

# 🚀 Features

- User Authentication
- AI-powered nutrition assistant
- Conversation history
- Responsive React frontend
- Node.js backend API
- Supabase database integration
- Dockerized services
- Kubernetes deployment
- NGINX Ingress routing
- Configuration using ConfigMaps
- Sensitive credentials managed with Kubernetes Secrets

---

# 🏗️ Architecture

```
                    Browser
                       │
                  localhost
                       │
                  NGINX Ingress
                  /           \
                 /             \
         Frontend Service   Backend Service
               │                 │
        React + Vite         Node.js API
                                   │
                              Supabase Cloud
```

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite

## Backend

- Node.js
- Express
- TypeScript

## Database

- Supabase

## DevOps

- Docker
- Kubernetes
- Minikube
- NGINX Ingress
- ConfigMaps
- Secrets

---

# 📂 Project Structure

```
SATIETY
│
├── satiety-ai-workspace-frontend/
│
├── satiety-ai-workspace-backend/
│
├── k8s/
│   ├── backend-configmap.yaml
│   ├── backend-secret.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   └── ingress.yaml
│
└── docker-compose.yml
```

---

# 🐳 Docker

## Build Backend

```bash
docker build -t satiety-backend:v1 .
```

## Build Frontend

```bash
docker build -t satiety-frontend:v1 .
```

---

# ☸ Kubernetes Deployment

Start Minikube

```bash
minikube start --driver=docker
```

Use Minikube Docker daemon

```bash
minikube docker-env | Invoke-Expression
```

Deploy ConfigMap

```bash
kubectl apply -f k8s/backend-configmap.yaml
```

Deploy Secret

```bash
kubectl apply -f k8s/backend-secret.yaml
```

Deploy Backend

```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
```

Deploy Frontend

```bash
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

Deploy Ingress

```bash
minikube addons enable ingress

kubectl apply -f k8s/ingress.yaml

minikube tunnel
```

---

# Verify Deployment

Pods

```bash
kubectl get pods
```

Services

```bash
kubectl get svc
```

Ingress

```bash
kubectl get ingress
```

Logs

```bash
kubectl logs deployment/satiety-backend

kubectl logs deployment/satiety-frontend
```

---

# Environment Configuration

Backend configuration is managed using Kubernetes ConfigMaps and Secrets.

## ConfigMap

Stores:

- PORT
- SUPABASE_URL

## Secret

Stores:

- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_ANON_KEY
- JWT_SECRET

---

# Local Access

After starting the ingress tunnel:

```
http://localhost
```

The frontend is served by NGINX and API requests are routed through Kubernetes Ingress.

---

# Future Improvements

- GitHub Actions CI/CD
- Automatic Docker image builds
- Automatic Kubernetes deployment
- AWS EKS deployment
- HTTPS with TLS
- Custom domain
- Horizontal Pod Autoscaler
- Monitoring with Prometheus & Grafana

---

# Screenshots

(Add screenshots here)

---

# Author

**Tripti Pandey**

DevOps Engineer | Kubernetes | Docker | AWS | React | TypeScript

LinkedIn: *(Add your profile)*

GitHub: *(Add your profile)*