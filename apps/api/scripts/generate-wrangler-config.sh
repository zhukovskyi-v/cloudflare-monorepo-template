#!/usr/bin/env bash
set -euo pipefail

# Generates wrangler.jsonc from .env file
# Usage: bun run setup

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$API_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env file not found at $ENV_FILE"
  echo "Copy .env.example to .env and fill in your values:"
  echo "  cp .env.example .env"
  exit 1
fi

# Load .env
set -a
source "$ENV_FILE"
set +a

# Validate required vars
for var in CLOUDFLARE_ACCOUNT_ID CLOUDFLARE_D1_DATABASE_ID CLOUDFLARE_KV_NAMESPACE_ID JWT_SECRET; do
  if [ -z "${!var:-}" ]; then
    echo "Error: $var is not set in .env"
    exit 1
  fi
done

# Generate wrangler.jsonc from the example template
sed \
  -e "s/<CLOUDFLARE_ACCOUNT_ID>/$CLOUDFLARE_ACCOUNT_ID/" \
  -e "s/<D1_DATABASE_ID>/$CLOUDFLARE_D1_DATABASE_ID/" \
  -e "s/<KV_NAMESPACE_ID>/$CLOUDFLARE_KV_NAMESPACE_ID/" \
  "$API_DIR/wrangler.jsonc.example" > "$API_DIR/wrangler.jsonc"

echo "Generated wrangler.jsonc with:"
echo "  account_id:   $CLOUDFLARE_ACCOUNT_ID"
echo "  database_id:  $CLOUDFLARE_D1_DATABASE_ID"
echo "  kv_namespace: $CLOUDFLARE_KV_NAMESPACE_ID"
