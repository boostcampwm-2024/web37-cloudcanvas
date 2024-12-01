output "vpc_id" {
    description = "vpc id"
    value = ncloud_vpc.vpc.id
}

output "public_subnets" {
    description = "public subnets infos"
    value = ncloud_subnet.public_subnets[*]
}

output "private_subnets" {
    description = "public subnets infos"
    value = ncloud_subnet.private_subnets[*]
}