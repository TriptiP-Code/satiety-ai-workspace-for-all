resource "aws_internet_gateway" "igw" {

  vpc_id = aws_vpc.satiety_vpc.id

  tags = merge(
    local.common_tags,
    {
      Name = "${var.project_name}-igw"
    }
  )


}