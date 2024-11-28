terraform {
  required_providers {
    ncloud = {
      source = "NaverCloudPlatform/ncloud"
    }
  }
  required_version = ">= 0.13"
}

resource "ncloud_vpc" "vpc" {
    name = var.vpc_name
    ipv4_cidr_block = var.ipv4_cidr_block
}

resource "ncloud_subnet" "public_subnets" {
  vpc_no = ncloud_vpc.vpc.id
  for_each = {for s in var.subnets : s.name => s if upper(s.subnet_type) == "PUBLIC"}
  name = "public-${ncloud_vpc.vpc.id}-${each.key}"
  subnet = each.value.subnet
  zone = each.value.zone
  subnet_type = "PUBLIC"
  usage_type = each.value.usage_type
  network_acl_no = ncloud_vpc.vpc.default_network_acl_no
}

resource "ncloud_subnet" "private_subnets" {
  vpc_no = ncloud_vpc.vpc.id
  for_each = {for s in var.subnets : s.name => s if upper(s.subnet_type) == "PRIVATE"}
  name = "private-${ncloud_vpc.vpc.id}-${each.key}"
  subnet = each.value.subnet
  zone = each.value.zone
  subnet_type = "PRIVATE"
  usage_type = each.value.usage_type
  network_acl_no = ncloud_vpc.vpc.default_network_acl_no
}