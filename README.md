# Satiety AI

Satiety AI is a full-stack personal-workspace application. It provides a React web interface for authenticated users to have an AI powered workspace , while an Express API manages authentication, user data, workspaces, conversations, messages, and the connection to Supabase.

The repository is also a local DevOps lab: the application is containerized, deployed to a local Minikube Kubernetes cluster, exposed through NGINX Ingress, delivered by GitHub Actions running on a Windows self-hosted runner, and observed with Prometheus and Grafana.

## Architecture

```text
                        GitHub
                          |
                    push tag vX.Y.Z
                          |
              GitHub Actions self-hosted runner
                    (Windows machine)
                  /                       \
      build and push images              kubectl apply + set image
            to Docker Hub                         |
                                               Minikube
                                                  |
  Browser --> http://localhost --> NGINX Ingress -+-- /       --> frontend Service --> React static site
                                                   |
                                                   +-- /api    --> backend Service  --> Express API
                                                                                |
                                                                                +--> Supabase
                                                                                +--> Gemini API

 Prometheus <--- ServiceMonitor <--- /metrics <--- backend Service
      |
   Grafana
```

## Technology stack

### Frontend

- **React 19** and **TypeScript** for the user interface.
- **Vite** for local development and production builds.
- **React Router** for client-side routing.
- **Tailwind CSS** for styling, with Lucide icons and Markdown rendering support.
- A multi-stage Docker build compiles the frontend with Node.js 22 and serves the generated static files with **NGINX** on port `80`.

### Backend

- **Node.js 22**, **Express 5**, and **TypeScript**.
- JSON request handling and CORS middleware.
- API route groups for health, chat, authentication, users, workspaces, conversations, and messages.
- **Supabase** provides the managed backend/database integration.
- **JWT** is used for application authentication.
- The backend can use a Gemini API key for its AI functionality.
- The application listens on `PORT` (default: `5000`).

### Observability

- **prom-client** exposes backend metrics at `GET /metrics`.
- Default Node.js process/runtime metrics are collected automatically.
- Custom application metrics:
  - `http_requests_total{method,route,status}` — total completed requests.
  - `http_request_duration_seconds{method,route,status}` — request-duration histogram, with buckets from `0.1` to `5` seconds.
- **kube-prometheus-stack**, installed with Helm, supplies Prometheus, Grafana, Alertmanager, Node Exporter, and Kubernetes-state metrics.
- A `ServiceMonitor` makes Prometheus scrape the backend every 15 seconds.

### DevOps and platform

- **Docker** and Docker Hub for portable, versioned images.
- **Kubernetes** running locally through **Minikube**.
- **NGINX Ingress Controller** routes `/` to the frontend and `/api` to the backend.
- Kubernetes **Deployments**, **Services**, **ConfigMaps**, **Secrets**, and **HorizontalPodAutoscalers**.
- **GitHub Actions** for CI, image releases, and manual deployments.
- A **Windows self-hosted GitHub Actions runner** performs release and deployment work against the local Minikube cluster.

## Repository layout

```text
.
├── satiety-ai-workspace-frontend/   # React + Vite frontend and NGINX image build
├── satiety-ai-workspace-backend/    # Express + TypeScript API and Prometheus metrics
├── k8s/                             # Kubernetes manifests
│   ├── backend-configmap.yaml
│   ├── backend-secret.yaml           # Template only; do not apply placeholder values
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── backend-servicemonitor.yaml
│   ├── backend-hpa.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── frontend-hpa.yaml
│   └── ingress.yaml
├── .github/workflows/
│   ├── backend-ci.yml
│   ├── frontend-ci.yml
│   ├── release.yml
│   └── deploy.yml
└── docker-compose.yml                # Local container development option
```

## Running locally with Docker Compose

Create environment files for the backend and frontend as required by the application, then run:

```powershell
docker compose up --build
```

The Compose configuration exposes the backend on `http://localhost:5000` and the frontend on `http://localhost:5173`.

## Kubernetes deployment on Minikube

### Prerequisites

Install and configure the following on the Windows machine that runs Minikube and the self-hosted runner:

- Docker Desktop (or another supported Docker runtime)
- Minikube
- `kubectl`
- Helm
- GitHub Actions self-hosted runner service

Start the cluster and enable Ingress:

```powershell
minikube start --driver=docker
minikube addons enable ingress
```

### Create the production secret

`k8s/backend-secret.yaml` intentionally contains placeholder values and must not be applied unchanged. Create or update the real secret directly from secure values:

```powershell
kubectl create secret generic backend-secret `
  --from-literal=SUPABASE_SERVICE_ROLE_KEY="..." `
  --from-literal=SUPABASE_ANON_KEY="..." `
  --from-literal=JWT_SECRET="..." `
  --from-literal=GEMINI_API_KEY="..." `
  --dry-run=client -o yaml | kubectl apply -f -
```

### Apply manifests manually

The workflow applies these manifests automatically, but the equivalent manual commands are:

```powershell
kubectl apply -f k8s/backend-configmap.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/backend-servicemonitor.yaml
kubectl apply -f k8s/backend-hpa.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/frontend-hpa.yaml
kubectl apply -f k8s/ingress.yaml
```

### Expose the application

The Ingress is configured for the host `localhost`. Keep this command running in a separate PowerShell window:

```powershell
minikube tunnel
```

Then open [http://localhost](http://localhost). Requests under `/api` are routed to the backend; all other requests go to the frontend.

> `minikube tunnel` is a local process. If it stops, the local Ingress address may no longer be reachable. It is not a public production load balancer.

### Verify the cluster

```powershell
kubectl get pods
kubectl get services
kubectl get ingress
kubectl get hpa
kubectl get servicemonitor -n monitoring
kubectl rollout status deployment/satiety-backend
kubectl rollout status deployment/satiety-frontend
```

Both the backend and frontend HPAs scale from 1 to 5 replicas when average CPU utilization exceeds 70%.

## Monitoring with Prometheus and Grafana

Install kube-prometheus-stack once in the `monitoring` namespace:

```powershell
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm upgrade --install monitoring prometheus-community/kube-prometheus-stack `
  --namespace monitoring --create-namespace
```

The backend Service must retain both of these details:

```yaml
metadata:
  labels:
    app: satiety-backend
spec:
  ports:
    - name: http
      port: 5000
```

The `ServiceMonitor` is in the `monitoring` namespace, selects that Service in `default`, and is labeled `release: monitoring` so the Prometheus instance installed by this Helm release selects it.

Useful PromQL queries:

```promql
# Scrape health (1 means the target is reachable)
up{job="satiety-backend-service"}

# Request rate over the last five minutes
sum(rate(http_requests_total[5m])) by (method, route, status)

# 95th percentile request duration over five minutes
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route)
)
```

The Prometheus job label is `satiety-backend-service` (the Kubernetes Service name), while `satiety-backend-monitor` is the ServiceMonitor/scrape-pool name.

## CI/CD workflow

This repository uses three separate GitHub Actions responsibilities.

| Workflow | Trigger | Runner | Purpose |
| --- | --- | --- | --- |
| `backend-ci.yml` | Push/PR to `main` affecting backend files | GitHub-hosted Ubuntu | `npm ci` and TypeScript build of the backend |
| `frontend-ci.yml` | Push/PR to `main` affecting frontend files | GitHub-hosted Ubuntu | `npm ci` and production build of the frontend |
| `release.yml` | Push a tag matching `v*` | Self-hosted Windows | Build images and push version-tagged frontend/backend images to Docker Hub |
| `deploy.yml` | Manual workflow dispatch | Self-hosted Windows | Apply Kubernetes manifests, deploy the selected image version, and wait for rollouts |

### Why a Windows self-hosted runner?

The Kubernetes cluster is local to the Windows machine. GitHub-hosted runners cannot reach that local Minikube cluster. A self-hosted runner executes inside the same environment, so its `kubectl`, Docker, and Minikube context can operate on the cluster directly.

For deployments to work, the runner machine must be powered on, the runner service must be online, Docker/Minikube must be running, and the runner user must be able to execute `kubectl` against the intended Minikube context.

### Release and deploy process

1. Merge validated changes to `main`.
2. Create and push a version tag such as `v1.0.0`.
3. `release.yml` builds both Docker images and pushes `:<tag>` versions to Docker Hub.
4. In GitHub Actions, manually run **Deploy Version** for that same tag.
5. `deploy.yml` applies the Kubernetes manifests, updates each Deployment image to the Docker Hub tag, waits for both rollouts, and shows deployment details.

The deployment workflow intentionally does **not** apply `backend-secret.yaml`, protecting the real secret from being replaced by template placeholders.

## Important operational notes

- The deployment workflow applies the tracked Kubernetes manifests before changing image tags. Service, ServiceMonitor, ConfigMap, HPA, and Ingress changes are therefore deployed with a new application release.
- Updating an image with `kubectl set image` alone does not update Kubernetes manifests; the preceding `kubectl apply` step is what keeps the cluster configuration aligned with this repository.
- If you deploy an older tag created before this workflow update, `actions/checkout` can check out that older version of the repository, which may not contain the manifest-apply step. Create a new tag from a commit containing the workflow update for reliable deployments.
- The `latest` images in the Deployment manifests are an initial/default value. The deployment workflow replaces them with the selected version tag.
- This setup is local infrastructure. Availability depends on the Windows host, Minikube, the self-hosted runner, and the `minikube tunnel` process remaining available.

## Useful troubleshooting commands

```powershell
# Pod status and logs
kubectl get pods
kubectl logs deployment/satiety-backend
kubectl logs deployment/satiety-frontend

# Backend service and endpoints
kubectl get service satiety-backend-service
kubectl get endpointslice -l kubernetes.io/service-name=satiety-backend-service

# Confirm the Service port is named "http" for the ServiceMonitor
kubectl get service satiety-backend-service -o jsonpath='{.spec.ports[0].name}'

# Inspect monitoring resources
kubectl get servicemonitor -n monitoring satiety-backend-monitor
kubectl get prometheus -n monitoring

# Cluster and rollout diagnostics
kubectl describe deployment satiety-backend
kubectl get events --sort-by=.lastTimestamp
```

## Future improvements

- Move the local Kubernetes environment to a managed cloud cluster.
- Store application secrets in a dedicated secret manager and synchronize them to Kubernetes.
- Add automated tests, security scanning, and image vulnerability scanning to CI.
- Add persistent Grafana dashboards and Prometheus alert rules for error rate, latency, and availability.
- Add TLS, a custom domain, and an externally managed Ingress/load balancer for public deployment.
