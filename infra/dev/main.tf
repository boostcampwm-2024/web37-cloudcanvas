terraform {
  required_providers {
    ncloud = {
      source = "NaverCloudPlatform/ncloud"
    }
  }
  required_version = ">= 0.13"
}

module "vpc_subnet" {
  source          = "../modules/vpc_subnet"
  vpc_name        = "dev"
  ipv4_cidr_block = "10.1.0.0/16"
  subnets = [
    {
      subnet     = "10.1.1.0/24"
      zone       = "KR-1"
      subnet_type = "PUBLIC"
      name       = "good"
      usage_type = "GEN"
    },
    {
      subnet     = "10.1.2.0/24"
      zone       = "KR-1"
      subnet_type = "PRIVATE"
      name       = "good2"
      usage_type = "GEN"
    },
    {
      subnet = "10.1.3.0/24"
      zone       = "KR-1"
      subnet_type = "PUBLIC"
      name       = "ccnat"
      usage_type = "NATGW"
    },
  ]
}

resource "ncloud_nat_gateway" "cc_nat_gateway" {
  vpc_no = module.vpc_subnet.vpc_id
  subnet_no = module.vpc_subnet.public_subnets[0].ccnat.id
  zone = "KR-1"
  name = "cc-nat-gateway"
}

resource "ncloud_route_table" "cc_nat_route_table" {
  vpc_no = module.vpc_subnet.vpc_id
  supported_subnet_type = "PRIVATE"
  name = "cc-private-route-table"
}

resource "ncloud_route_table_association" "cc_nat_route_table_association" {
  route_table_no = ncloud_route_table.cc_nat_route_table.id
  subnet_no = module.vpc_subnet.private_subnets[0].good2.id
}

resource "ncloud_route" "cc_nat_route" {
  route_table_no = ncloud_route_table.cc_nat_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  target_type = "NATGW"
  target_name = ncloud_nat_gateway.cc_nat_gateway.name
  target_no = ncloud_nat_gateway.cc_nat_gateway.id
}

module "server" {
  source = "../modules/server"
  login_key_name = "dev-login"
  public_servers = [
    {
      name = "test"
      subnet_no = module.vpc_subnet.public_subnets[0].good.id
      server_image_product_code = "SW.VSVR.OS.LNX64.ROCKY.0808.B050"
    }
  ]
  private_servers = [
    {
      name = "cc-private-server"
      description = "back"
      subnet_no = module.vpc_subnet.private_subnets[0].good2.id
      member_server_image_no = var.cc_member_server_image_no
    },
    {
      name = "cc-private-server-2"
      description = "monitor"
      subnet_no = module.vpc_subnet.private_subnets[0].good2.id
      member_server_image_no = var.cc_member_server_image_no
    },
    {
      name = "cc-private-server-3"
      description = "database"
      subnet_no = module.vpc_subnet.private_subnets[0].good2.id
      member_server_image_no = var.cc_member_server_image_no
    },
  ]
  
}