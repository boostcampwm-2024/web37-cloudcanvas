variable "login_key_name" {
  description = "server login key name"
  type = string
}

variable "public_servers" {
  description = "public server module variables"
  type = list(object({
    server_image_product_code = optional(string)
    server_product_code = optional(string)
    server_spec_code = optional(string)
    member_server_image_no = optional(string)
    name = string
    description = optional(string)
    zone = optional(string)
    subnet_no = string
  }))

  default = []
}

variable "private_servers" {
  description = "private server module variables"
  type = list(object({
    server_image_product_code = optional(string)
    server_product_code = optional(string)
    server_spec_code = optional(string)
    member_server_image_no = optional(string)
    name = string
    description = optional(string)
    zone = optional(string)
    subnet_no = string
  }))

  default = []
}