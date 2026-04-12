terraform {
  # you can set up your HCP Terraform Cloud organization and workspace here if you want to use Terraform Cloud for state management and remote runs,
  # or you can remove the `cloud` block to manage state locally, s3, GCP bucket, etc.
  # cloud {
  #   organization = "" # replace with your HCP Terraform organization name
  #   workspaces {
  #     name = "" # replace with your HCP Terraform workspace name
  #   }
  # }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
    external = {
      source  = "hashicorp/external"
      version = "~> 2.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

data "external" "git_info" {
  program = ["bash", "-c", <<-EOT
    TAG=$(git describe --tags --always 2>/dev/null || echo "0.0.0")
    MSG=$(git log -1 --pretty=%s 2>/dev/null || echo "Default deploy")
    printf '{"tag":"%s","message":"%s"}' "$TAG" "$MSG"
  EOT
  ]
  working_dir = path.module
}

# this external data source is used to fetch the workers.dev subdomain for the account, which is needed to construct the worker's default URL in outputs.tf
data "external" "workers_subdomain" {
  program = ["bash", "-c", <<-EOT
    INPUT=$(cat)
    ACCOUNT_ID=$(echo "$INPUT" | jq -r '.account_id')
    API_TOKEN=$(echo "$INPUT" | jq -r '.api_token')
    SUBDOMAIN=$(curl -s "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/subdomain" \
      -H "Authorization: Bearer $API_TOKEN" | jq -r '.result.subdomain')
    printf '{"subdomain":"%s"}' "$SUBDOMAIN"
  EOT
  ]

  query = {
    account_id = var.account_id
    api_token  = var.cloudflare_api_token
  }
}

resource "cloudflare_d1_database" "api_sql_db" {
  account_id = var.account_id
  name       = "main_api_sql_db" # replace with your desired database name

  lifecycle {
    ignore_changes = [
      read_replication
    ]
    prevent_destroy = true
  }
}

resource "cloudflare_workers_kv_namespace" "api_workers_kv_namespace" {
  account_id = var.account_id
  title      = "api-KV-namespace" # replace with your desired KV namespace title
  lifecycle {
    prevent_destroy = true
  }
}

resource "cloudflare_worker" "api_worker" {
  account_id = var.account_id
  name       = "api-worker-dev" # replace with your desired worker name
  observability = {
    enabled            = true
    head_sampling_rate = 1
    logs = {
      enabled            = true
      head_sampling_rate = 1
      invocation_logs    = true
    }
  }
  subdomain = {
    enabled          = true
    previews_enabled = true
  }
  tags = ["main-api"]
}

resource "cloudflare_worker_version" "api_worker_version" {
  account_id = var.account_id
  worker_id  = cloudflare_worker.api_worker.id

  main_module = "index.js"

  modules = [{
    name         = "index.js"
    content_type = "application/javascript+module"
    content_file = "${path.module}/../../../apps/api/dist/index.js"
  }]

  placement = {
    mode = "smart"
  }

  annotations = {
    workers_message = data.external.git_info.result.message
    workers_tag     = data.external.git_info.result.tag
  }

  bindings = [
    {
      name = "MAIN_API_SQL_DB"
      id   = cloudflare_d1_database.api_sql_db.id
      type = "d1"
    },
    {
      name         = "DEFAULT_KV"
      namespace_id = cloudflare_workers_kv_namespace.api_workers_kv_namespace.id
      type         = "kv_namespace"
    },
    {
      name = "MY_ENV_VAR2"
      text = "some_value"
      type = "plain_text"
    }
  ]
}

resource "cloudflare_workers_deployment" "api_deployment" {
  account_id = var.account_id

  versions = [{
    version_id = cloudflare_worker_version.api_worker_version.id
    percentage = 100
  }]
  script_name = cloudflare_worker.api_worker.name
  strategy    = "percentage"
}

resource "cloudflare_workers_custom_domain" "api_workers_custom_domain" {
  account_id  = var.account_id
  hostname    = "api.temp-email-dev.v-share.cfd"
  service     = cloudflare_worker.api_worker.name
  zone_id     = var.main_domain_zone_id
  environment = "production"
  count = var.main_domain_zone_id != null && var.main_domain_zone_id != "" ? 1 : 0
}
