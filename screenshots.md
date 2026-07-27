01-homepage.png

<img width="1917" height="962" alt="image" src="https://github.com/user-attachments/assets/f8c2d111-8ccd-4d0b-972a-5f0d0869daf0" />

02-registeration.png


<img width="1916" height="957" alt="image" src="https://github.com/user-attachments/assets/b59f4797-9db7-495a-b7db-07d4aeea4875" />

03-login.png


<img width="1917" height="962" alt="image" src="https://github.com/user-attachments/assets/081a3c01-3885-4336-8531-263795e8fef1" />

04-workspace.png

when we login , we will land to a general workspace , with newchat there we can use satiety AI to have conversation with it. Suppose you want to learn React u can make a new workspace and name is REACT and then inside create new chat and ask AI to teach you react ,in that conversation you can specifically keep you conversation wrt to learning AI. Then you may create a new chat , where u can ask AI to help you in React practical , so rename the chat as React Practical and then u can keep that conversation the same puspose. This is how Satiety AI helps you organise and simplify your AI learnings and scheduling.


<img width="1917" height="961" alt="image" src="https://github.com/user-attachments/assets/ee64fbc0-40fa-43d4-925f-817bfaef5f57" />

05-supabase.png 
Database Architecture : the following schema represents the PostgreSQL database design hosted on Supabase.


<img width="1917" height="947" alt="image" src="https://github.com/user-attachments/assets/5426553b-0517-4f75-a9fc-9473dc542004" />

07-docker_hub_image.png
 Satiety AI application is containerized using Docker and published to Docker Hub with versioned image tags. Separate repositories are maintained for the frontend and backend services, allowing independent versioning, deployment, and rollback. Every release is tagged following semantic versioning, enabling reproducible deployments across development and production environments.

Repositories
- Backend Image: `triptipcode/satiety-backend`
- Frontend Image: `triptipcode/satiety-frontend`

The Kubernetes cluster always pulls the required image version directly from Docker Hub during deployment.

<img width="1912" height="976" alt="image" src="https://github.com/user-attachments/assets/2c7cacbe-d805-46e9-8ce3-5b6d1ca184f7" />


08-Docker_Desktop.png
During development, Docker Desktop was used to build, test, and manage container images before publishing them to Docker Hub. Multiple image versions were maintained to validate new features, monitor application stability, and support rollback whenever required.
This workflow ensured consistent container builds and identical runtime environments across local development and the Kubernetes cluster.

<img width="1917" height="1010" alt="image" src="https://github.com/user-attachments/assets/8c93196d-7258-4252-9115-88fd0d690a13" />

09-K8s.png
Minikube cluster status : minikube status  , kubectl get nodes
Kubernetes workloads : kubectl get pods , kubectl get svc , kubectl get ingress , kubectl get hpa
This demonstrates that frontend, backend, Services, Ingress, and autoscaling are deployed.

<img width="1847" height="866" alt="image" src="https://github.com/user-attachments/assets/0eaa3364-24b5-4a3e-a58a-b7c6ad9fb970" />

<img width="1851" height="682" alt="image" src="https://github.com/user-attachments/assets/a0fe8734-d8ff-4ed1-8bf4-d3e61d3439e0" />


10.Github_actions.png
Release images , when a tag is created i.e git tag v19.0.0 and git push origin v19.0.0 

<img width="1915" height="958" alt="image" src="https://github.com/user-attachments/assets/6fb8aee7-0797-4b10-ae47-081a030766fc" />

10.Github_actions_deployment.png
We deploy the latest tag

<img width="1915" height="875" alt="image" src="https://github.com/user-attachments/assets/11329a58-78db-44d6-ba25-d634d7322e16" />

<img width="1917" height="857" alt="image" src="https://github.com/user-attachments/assets/5d1cbb63-c19b-453c-8a8b-e7cfef8fe74f" />

11.Prometheus.png
This screenshot demonstrates that Prometheus is successfully scraping metrics from the Satiety AI backend service along with Kubernetes cluster components. The up query confirms that the backend monitoring endpoint is healthy (up = 1), meaning Prometheus is actively collecting application metrics exposed through the /metrics endpoint using a ServiceMonitor.

<img width="1917" height="863" alt="image" src="https://github.com/user-attachments/assets/88343d8f-ab79-4864-a327-35cb73fb86ff" />

12.Grafana_Dashboard.png
A custom Grafana dashboard built for monitoring the Satiety AI application's runtime behavior. It visualizes key application metrics collected by Prometheus, including: Total HTTP Requests,Requests Per Second (RPS),Average API Response Time,HTTP Error Rate

<img width="1917" height="971" alt="image" src="https://github.com/user-attachments/assets/52a75558-603f-4ac1-a7ad-8ab54b79a5fd" />

13.Grafana_Dashboard.png
A dedicated Grafana dashboard for monitoring Kubernetes infrastructure and container resource utilization. Metrics collected through Prometheus include: Backend CPU Usage, Frontend CPU Usage, Backend Memory Consumption, Frontend Memory Consumption,Cluster-wide CPU Usage, Running Kubernetes Pods

<img width="1917" height="870" alt="image" src="https://github.com/user-attachments/assets/8e568dee-25d5-48f6-9c49-c9539c5b6f28" />



