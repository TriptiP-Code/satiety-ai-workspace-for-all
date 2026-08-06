#############################################
# EKS OIDC Provider
#############################################

data "tls_certificate" "eks" {
  url = aws_eks_cluster.eks_cluster.identity[0].oidc[0].issuer
}

resource "aws_iam_openid_connect_provider" "eks" {
    depends_on = [
    aws_eks_cluster.eks_cluster
  ]



  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [
    data.tls_certificate.eks.certificates[0].sha1_fingerprint
  ]

  url = aws_eks_cluster.eks_cluster.identity[0].oidc[0].issuer

  tags = merge(
    local.common_tags,
    {
      Name = "${var.project_name}-oidc"
    }
  )
}

resource "aws_iam_policy" "alb_controller_policy" {

  name = "${var.project_name}-alb-controller-policy"

  policy = file("${path.module}/iam-policy/alb-controller-policy.json")

  tags = merge(
    local.common_tags,
    {
      Name = "${var.project_name}-alb-policy"
    }
  )
}

resource "aws_iam_role" "alb_controller_role" {

  name = "${var.project_name}-alb-controller-role"

  assume_role_policy = jsonencode({

    Version = "2012-10-17"

    Statement = [

      {

        Effect = "Allow"

        Principal = {

          Federated = aws_iam_openid_connect_provider.eks.arn

        }

        Action = "sts:AssumeRoleWithWebIdentity"

        Condition = {

          StringEquals = {

            "${replace(
              aws_iam_openid_connect_provider.eks.url,
              "https://",
              ""
            )}:sub" = "system:serviceaccount:kube-system:aws-load-balancer-controller"

          }

        }

      }

    ]

  })

  tags = merge(
    local.common_tags,
    {
      Name = "${var.project_name}-alb-role"
    }
  )
}

resource "aws_iam_role_policy_attachment" "alb_controller_attach" {

  role = aws_iam_role.alb_controller_role.name

  policy_arn = aws_iam_policy.alb_controller_policy.arn
}