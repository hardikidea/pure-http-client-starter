terraform {
  backend "s3" {
    bucket         = "pure-http-client-starter-terraform-state"
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "pure-http-client-starter-lock"
  }
}
