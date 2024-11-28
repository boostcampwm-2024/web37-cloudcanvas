variable "access_key" {
  description = "ncloud access key"
  type        = string
  sensitive   = true
}

variable "secret_key" {
  description = "ncloud secret key"
  type        = string
  sensitive   = true
}

variable "cc_member_server_image_no" {
  description = "ncloud member server image"
  type        = string
  sensitive   = true
}