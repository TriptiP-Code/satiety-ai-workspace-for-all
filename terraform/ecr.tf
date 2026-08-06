resource "aws_ecr_repository" "backend_repo" {

  name = "${var.project_name}-backend"

  image_tag_mutability = "MUTABLE"

  force_delete = true

  tags = merge(
    local.common_tags,
    {
      Name = "${var.project_name}-backend"
    }
  )

}

resource "aws_ecr_repository" "frontend_repo" {

  name = "${var.project_name}-frontend"

  image_tag_mutability = "MUTABLE"

  force_delete = true

  tags = merge(
    local.common_tags,
    {
      Name = "${var.project_name}-frontend"
    }
  )

}

