# Terraform Infrastructure Documentation

# Project

**Satiety AI – Production-Style AWS Infrastructure using Terraform**

This project provisions a complete AWS infrastructure for deploying the Satiety AI application on Amazon EKS using Infrastructure as Code (IaC).

Instead of manually creating cloud resources through the AWS Console, the entire infrastructure is reproducible using Terraform.

---

# Objectives

The infrastructure was designed with the following goals:

- Infrastructure as Code (IaC)
- Production-style networking
- Secure workload isolation
- Kubernetes-ready architecture
- Public application exposure through AWS ALB
- Cost optimization using AWS Free Tier wherever possible
- Easy teardown using Terraform Destroy

---

# Technologies Used

- Terraform
- AWS
- Amazon EKS
- IAM
- Amazon VPC
- NAT Gateway
- Internet Gateway
- Elastic IP
- Route Tables
- ECR
- AWS Load Balancer Controller
- OIDC Provider
- Kubernetes

---

# Folder Structure

```
terraform/
│
├── alb.tf
├── ecr.tf
├── eks.tf
├── iam.tf
├── nat.tf
├── networking.tf
├── nodegroup.tf
├── outputs.tf
├── providers.tf
├── route-table.tf
├── security-groups.tf
├── variables.tf
├── versions.tf
├── locals.tf
│
├── iam-policy/
│   └── alb-controller-policy.json
│
└── terraform.tfvars
```

---

# Infrastructure Architecture

```
Internet
     │
     ▼
Internet Gateway
     │
     ▼
Public Subnets
     │
     ▼
AWS Application Load Balancer
     │
     ▼
Amazon EKS Cluster
     │
     ▼
Worker Nodes (Private Subnets)
     │
     ▼
Frontend Pods
Backend Pods
```

---

# Networking

## VPC

A dedicated VPC was created to isolate the entire application infrastructure.

CIDR Block

```
10.0.0.0/16
```

This provides sufficient IP space for future scaling.

---

## Subnets

Four subnets were created across two Availability Zones.

### Public Subnets

Purpose

- Internet Gateway
- Application Load Balancer
- NAT Gateway

```
Public Subnet 1
Public Subnet 2
```

---

### Private Subnets

Purpose

- EKS Worker Nodes
- Kubernetes Pods

```
Private Subnet 1
Private Subnet 2
```

Worker nodes never receive public IPs.

---

## Internet Gateway

An Internet Gateway is attached to the VPC to provide internet access for public resources.

Resources using Internet Gateway

- Application Load Balancer
- NAT Gateway

---

## NAT Gateway

A NAT Gateway was deployed inside the public subnet.

Purpose

Allows worker nodes inside private subnets to

- Pull Docker images
- Install packages
- Reach AWS APIs

without exposing them directly to the internet.

---

## Elastic IP

A static Elastic IP was attached to the NAT Gateway.

This ensures consistent outbound connectivity.

---

## Route Tables

### Public Route Table

```
0.0.0.0/0
    ↓
Internet Gateway
```

Associated with

- Public Subnet 1
- Public Subnet 2

---

### Private Route Table

```
0.0.0.0/0
    ↓
NAT Gateway
```

Associated with

- Private Subnet 1
- Private Subnet 2

---

# Security Groups

Separate security groups were created following the principle of least privilege.

---

## ALB Security Group

Inbound

HTTP

```
80
```

HTTPS (future)

```
443
```

Source

```
0.0.0.0/0
```

Outbound

All traffic

---

## EKS Node Security Group

Allows traffic from

- Application Load Balancer

Allows internal cluster communication.

---

# IAM

Separate IAM roles were created for different AWS services.

---

## EKS Cluster Role

Attached Policies

- AmazonEKSClusterPolicy

Purpose

Allows EKS Control Plane to manage Kubernetes resources.

---

## Node Group Role

Attached Policies

- AmazonEKSWorkerNodePolicy
- AmazonEKS_CNI_Policy
- AmazonEC2ContainerRegistryReadOnly

Purpose

Allows worker nodes to

- Join cluster
- Pull container images
- Configure networking

---

# Amazon EKS

An Amazon Elastic Kubernetes Service cluster was provisioned.

Configuration

- Kubernetes Version 1.33
- Public Endpoint Enabled
- Private Endpoint Enabled

Cluster spans

- Two Availability Zones
- Four Subnets

---

# Managed Node Group

Configuration

```
Instance Type

t3.small

Desired

1

Minimum

1

Maximum

2
```

Reason

A single worker node minimizes AWS costs while remaining capable of hosting both frontend and backend workloads.

---

# Amazon ECR

Two Elastic Container Registry repositories were created.

```
Frontend Repository

satiety-ai-frontend

Backend Repository

satiety-ai-backend
```

Purpose

Store production Docker images used by Kubernetes deployments.

---

# OIDC Provider

Terraform automatically provisions an IAM OpenID Connect Provider.

Purpose

Allows Kubernetes Service Accounts to securely assume AWS IAM Roles without storing AWS credentials inside Pods.

---

# AWS Load Balancer Controller

Instead of manually creating an ALB, Kubernetes automatically provisions it.

Terraform provisions

- IAM Policy
- IAM Role
- OIDC Trust Relationship

The controller is installed later using Helm.

---

# Outputs

Terraform exports useful values after deployment.

Examples

- VPC ID
- Cluster Name
- Cluster Endpoint
- Public Subnet IDs
- Private Subnet IDs
- Backend ECR URL
- Frontend ECR URL

These outputs simplify later Kubernetes deployment.

---

# Deployment Flow

```
terraform init

↓

terraform validate

↓

terraform plan

↓

terraform apply

↓

AWS Infrastructure Created

↓

Docker Images Built

↓

Images Pushed to Amazon ECR

↓

kubectl apply

↓

AWS Load Balancer Created Automatically

↓

Application Live
```

---

# Cost Optimization

Since this project was deployed using a personal AWS account, several measures were taken to reduce infrastructure cost.

Examples

- Single worker node
- t3.small instance
- Resources destroyed after testing
- Infrastructure recreated using Terraform when needed

This approach keeps AWS charges minimal while preserving reproducibility.

---

# Benefits of Terraform

Using Terraform provided several advantages compared to manual AWS provisioning.

- Entire infrastructure version controlled
- Reproducible deployments
- Faster environment creation
- Easy rollback
- Easier collaboration
- One-command cleanup using

```
terraform destroy
```

---

# Future Improvements

- Remote Terraform State (S3 + DynamoDB)
- Terraform Modules
- Multi-environment support
- GitHub Actions Infrastructure Pipeline
- Route53 Domain
- ACM HTTPS Certificates
- AWS WAF
- Cluster Autoscaler
- External DNS
- CloudWatch Container Insights
- Terraform Workspaces