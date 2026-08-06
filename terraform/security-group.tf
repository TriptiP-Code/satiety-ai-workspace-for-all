resource "aws_security_group" "alb_sg" {

  name        = "${var.project_name}-alb-sg"
  description = "Security Group for Application Load Balancer"
  vpc_id      = aws_vpc.satiety_vpc.id

  ingress {
    description = "HTTP"

    from_port = 80
    to_port   = 80
    protocol  = "tcp"

    cidr_blocks = [
      "0.0.0.0/0"
    ]
  }

  egress {

    from_port = 0
    to_port   = 0
    protocol  = "-1"

    cidr_blocks = [
      "0.0.0.0/0"
    ]
  }

  tags = merge(
    local.common_tags, {
      Name = "${var.project_name}-alb-sg"
  })

}

resource "aws_security_group" "eks_nodes_sg" {

  name        = "${var.project_name}-eks-node-sg"
  description = "Security Group for EKS Worker Nodes"
  vpc_id      = aws_vpc.satiety_vpc.id

  ingress {

    description = "Allow traffic from ALB"

    from_port = 0
    to_port   = 65535

    protocol = "tcp"

    security_groups = [
      aws_security_group.alb_sg.id
    ]

  }

  egress {

    from_port = 0
    to_port   = 0

    protocol = "-1"

    cidr_blocks = [
      "0.0.0.0/0"
    ]

  }

  tags = merge(
    local.common_tags, {
      Name = "${var.project_name}-eks-node-sg"
  })

}

