terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
  }
}

locals {
  config_path_rel = "wrangler.tf-generated.jsonc"
  config_path_abs = "${var.repo_root}/${var.app_path}/${local.config_path_rel}"

  wrangler_config = jsonencode(merge(
    {
      "$schema"           = "node_modules/wrangler/config-schema.json"
      name                = var.worker_name
      main                = var.main_module
      compatibility_date  = var.compatibility_date
      compatibility_flags = var.compatibility_flags
      workers_dev         = var.workers_dev
      assets = {
        directory = var.assets_dir
        binding   = var.assets_binding
      }
      vars = var.env_vars
    },
    var.observability != null ? { observability = var.observability } : {},
    var.placement_mode != null ? { placement = { mode = var.placement_mode } } : {},
  ))
}

resource "local_file" "wrangler_config" {
  filename        = local.config_path_abs
  content         = local.wrangler_config
  file_permission = "0644"
}

resource "null_resource" "deploy" {
  triggers = merge({
    worker_name = var.worker_name
    config_hash = sha256(local.wrangler_config)
    src_hash = sha256(join("", [
      for f in fileset("${var.repo_root}/${var.app_path}/src", "**") :
      filesha256("${var.repo_root}/${var.app_path}/src/${f}")
    ]))
  }, var.extra_triggers)

  depends_on = [local_file.wrangler_config]

  provisioner "local-exec" {
    working_dir = var.repo_root
    command     = <<EOT
      ${var.build_command} && \
      cd ${var.app_path} && \
      bunx wrangler deploy --config ${local.config_path_rel}
    EOT

    environment = merge({
      CLOUDFLARE_API_TOKEN  = var.cloudflare_api_token
      CLOUDFLARE_ACCOUNT_ID = var.account_id
    }, var.env_vars)
  }
}

resource "cloudflare_workers_custom_domain" "this" {
  count       = var.custom_domain != null && var.custom_domain != "" && var.zone_id != null && var.zone_id != "" ? 1 : 0
  account_id  = var.account_id
  hostname    = var.custom_domain
  service     = var.worker_name
  zone_id     = var.zone_id
  environment = var.environment
  depends_on  = [null_resource.deploy]
}