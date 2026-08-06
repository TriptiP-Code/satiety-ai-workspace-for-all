resource "aws_eks_node_group" "satiety_node_group" {

  cluster_name    = aws_eks_cluster.eks_cluster.name
  node_group_name = "${var.project_name}-node-group"

  node_role_arn = aws_iam_role.eks_node_role.arn

  subnet_ids = [
    aws_subnet.private_subnet_1.id,
    aws_subnet.private_subnet_2.id
  ]

  instance_types = ["t3.small"]

  capacity_type = "ON_DEMAND"

  ami_type = "AL2023_x86_64_STANDARD"

  scaling_config {

    desired_size = 1
    min_size     = 1
    max_size     = 2

  }

  update_config {
    max_unavailable = 1
  }

  depends_on = [

    aws_iam_role_policy_attachment.worker_node_policy,
    aws_iam_role_policy_attachment.cni_policy,
    aws_iam_role_policy_attachment.ecr_readonly,
    aws_eks_cluster.eks_cluster

  ]

  tags = merge(
    local.common_tags,
    {
      Name = "${var.project_name}-node-group"
    }
  )

}