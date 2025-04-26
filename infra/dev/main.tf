provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "dev_bucket" {
  bucket = "${var.project_name}-${var.env_name}-${random_id.bucket_id.hex}"
  acl    = "private"

  tags = {
    Environment = var.env_name
    Project     = var.project_name
  }
}

resource "random_id" "bucket_id" {
  byte_length = 4
}
