output "vpc_id" {
  description = "VPC ID"

  value = aws_vpc.satiety_vpc.id
}

output "public_subnets" {

  value = [
    aws_subnet.public_subnet_1.id,
    aws_subnet.public_subnet_2.id
  ]

}

output "private_subnets" {

  value = [
    aws_subnet.private_subnet_1.id,
    aws_subnet.private_subnet_2.id
  ]

}

output "cluster_name" {

  value = aws_eks_cluster.eks_cluster.name

}

output "cluster_endpoint" {

  value = aws_eks_cluster.eks_cluster.endpoint

}

output "backend_ecr" {

  value = aws_ecr_repository.backend_repo.repository_url

}

output "frontend_ecr" {

  value = aws_ecr_repository.frontend_repo.repository_url

}

output "cluster_certificate" {
  value     = aws_eks_cluster.eks_cluster.certificate_authority[0].data
  sensitive = true
}