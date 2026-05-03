output "d1_database_id" {
  value = cloudflare_d1_database.api_sql_db.id
}

output "kv_storage_id" {
  value = cloudflare_workers_kv_namespace.api_workers_kv_namespace.id
}

output "worker_subdomain_url" {
  description = "Worker's built-in workers.dev URL"
  value       = "https://${cloudflare_worker.api_worker.name}.${data.external.workers_subdomain.result.subdomain}.workers.dev"
}

output "custom_domain_url" {
  description = "Custom domain URL (if zone_id is set)"
  value       = one(cloudflare_workers_custom_domain.api_workers_custom_domain[*].hostname) != null ? "https://${one(cloudflare_workers_custom_domain.api_workers_custom_domain[*].hostname)}" : null
}

output "web_worker_subdomain_url" {
  description = "Web worker's built-in workers.dev URL"
  value       = module.web.worker_subdomain_url
}

output "web_custom_domain_url" {
  description = "Web custom domain URL (if zone_id is set)"
  value       = module.web.custom_domain_url
}
