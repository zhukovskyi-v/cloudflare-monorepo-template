variable "account_id" {
  type = string
}

variable "cloudflare_api_token" {
  type        = string
  description = "Cloudflare API Token (from environment: TF_VAR_cloudflare_api_token)"
  sensitive   = true
}

variable "main_domain_zone_id" {
  type        = string
  description = "Cloudflare Zone ID for api domains (from environment: TF_VAR_main_domain_zone_id)"
  default     = null
}
