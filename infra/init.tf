terraform {
  required_providers {
    ncloud = {
      source = "NaverCloudPlatform/ncloud"
    }
  }
  backend "remote" {}

  required_version = ">= 0.13"
}

provider "ncloud" {
  access_key  = var.access_key
  secret_key  = var.secret_key
  support_vpc = true
  region      = "KR"
}

module "dev" {
  source                    = "./dev"
  cc_member_server_image_no = var.cc_member_server_image_no
}