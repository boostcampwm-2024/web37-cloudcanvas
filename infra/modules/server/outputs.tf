output "server_publics" {
  value = ncloud_server.public_servers[*]
  description = "public server infos"
}

output "server_privates" {
  value = ncloud_server.private_servers[*]
  description = "private server infos"
}