output "worker_name" {
  value = var.worker_name
}

output "worker_subdomain_url" {
  description = "Worker's built-in workers.dev URL"
  value       = "https://${var.worker_name}.${var.workers_subdomain}.workers.dev"
}

output "custom_domain_url" {
  description = "Custom domain URL (if custom_domain + zone_id set)"
  value       = one(cloudflare_workers_custom_domain.this[*].hostname) != null ? "https://${one(cloudflare_workers_custom_domain.this[*].hostname)}" : null
}