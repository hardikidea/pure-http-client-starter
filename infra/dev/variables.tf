variable "project_name" {
  description = "Project name for tagging resources."
  type        = string
}

variable "env_name" {
  description = "Environment name (dev, stage, prod)."
  type        = string
}

variable "aws_region" {
  description = "AWS region."
  type        = string
  default     = "us-east-1"
}
