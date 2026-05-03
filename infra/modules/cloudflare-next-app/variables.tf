variable "account_id" {
  type        = string
  description = "Cloudflare account ID"
}

variable "cloudflare_api_token" {
  type        = string
  description = "Cloudflare API token (used by wrangler CLI)"
  sensitive   = true
}

variable "worker_name" {
  type        = string
  description = "Name of the Worker (must be unique per Cloudflare account)"
}

variable "app_path" {
  type        = string
  description = "Path to the Next.js app directory relative to repo_root, e.g. \"apps/web\""
}

variable "repo_root" {
  type        = string
  description = "Absolute path to monorepo root (where build command runs). Use \"$${path.root}/../../..\" from envs/<env>/."
}

variable "build_command" {
  type        = string
  description = "Build command executed from repo_root before wrangler deploy"
  default     = "bunx wrangler deploy"
}

variable "env_vars" {
  type        = map(string)
  description = "Plain-text vars. Set as build-time env (Next.js inlining) AND runtime worker vars (visible in CF dashboard)."
  default     = {}
}

variable "custom_domain" {
  type        = string
  description = "Optional custom hostname (e.g. web.example.com)"
  default     = null
}

variable "zone_id" {
  type        = string
  description = "Cloudflare Zone ID for custom_domain"
  default     = null
}

variable "workers_subdomain" {
  type        = string
  description = "workers.dev subdomain for the account (used to construct subdomain URL output)"
}

variable "environment" {
  type        = string
  description = "Application environment (e.g. dev/stage/prod). Used in cloudflare_workers_custom_domain."
  default     = "production"
}

variable "compatibility_date" {
  type        = string
  description = "Workers compatibility_date"
  default     = "2026-01-01"
}

variable "compatibility_flags" {
  type        = list(string)
  description = "Workers compatibility_flags"
  default     = ["nodejs_compat", "global_fetch_strictly_public"]
}

variable "main_module" {
  type        = string
  description = "Path to worker entry (relative to app_path)"
  default     = ".open-next/worker.js"
}

variable "assets_dir" {
  type        = string
  description = "Path to static assets dir (relative to app_path)"
  default     = ".open-next/assets"
}

variable "assets_binding" {
  type        = string
  description = "Worker binding name for ASSETS"
  default     = "ASSETS"
}

variable "workers_dev" {
  type        = bool
  description = "Enable <worker>.<subdomain>.workers.dev URL"
  default     = true
}

variable "observability" {
  type = object({
    enabled            = bool
    head_sampling_rate = optional(number, 1)
    logs = optional(object({
      enabled            = bool
      head_sampling_rate = optional(number, 1)
      invocation_logs    = optional(bool, true)
    }))
  })
  description = "Observability config. Set to null to disable."
  default = {
    enabled            = true
    head_sampling_rate = 1
    logs = {
      enabled            = true
      head_sampling_rate = 1
      invocation_logs    = true
    }
  }
}

variable "placement_mode" {
  type        = string
  description = "Worker placement mode (\"smart\" or null)"
  default     = "smart"
}

variable "extra_triggers" {
  type        = map(string)
  description = "Extra trigger keys to force re-deploy (e.g. dependency hashes from sibling modules)"
  default     = {}
}