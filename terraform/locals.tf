locals {
  common_tags = {
    Project     = "Satiety-AI"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}