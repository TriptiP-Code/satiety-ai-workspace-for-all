variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment"
  type        = string
  default     = "dev"
}

variable "project_name" {

  type = string

  validation {

    condition = length(var.project_name) > 0

    error_message = "Project name cannot be empty."

  }

}

variable "eks_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.33"
}