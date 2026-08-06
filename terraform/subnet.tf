# Public Subnet 1
resource "aws_subnet" "public_subnet_1" {
  vpc_id                  = aws_vpc.satiety_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = merge(
    local.common_tags, {
      Name = "${var.project_name}-public-subnet-1"

      "kubernetes.io/role/elb" = "1"
  })
}

# Public Subnet 2
resource "aws_subnet" "public_subnet_2" {
  vpc_id                  = aws_vpc.satiety_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true

  tags = merge(
    local.common_tags, {
      Name = "${var.project_name}-public-subnet-2"

      "kubernetes.io/role/elb" = "1"
  })
}

# Private Subnet 1
resource "aws_subnet" "private_subnet_1" {
  vpc_id            = aws_vpc.satiety_vpc.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "us-east-1a"

  tags = merge(
    local.common_tags, {
      Name = "${var.project_name}-private-subnet-1"

      "kubernetes.io/role/internal-elb" = "1"
  })
}

# Private Subnet 2
resource "aws_subnet" "private_subnet_2" {
  vpc_id            = aws_vpc.satiety_vpc.id
  cidr_block        = "10.0.12.0/24"
  availability_zone = "us-east-1b"

  tags = merge(
    local.common_tags, {
      Name = "${var.project_name}-private-subnet-2"

      "kubernetes.io/role/internal-elb" = "1"
  })
}