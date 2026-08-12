#!/usr/bin/env bash

set -euo pipefail

VANTOGO_SITE_ID="${1:?Usage: migrate-wix-managed-cms.sh SITE_ID}"
VANTOGO_PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VANTOGO_PAYLOAD_DIR="$VANTOGO_PROJECT_ROOT/wix-managed-migration"
VANTOGO_WIX_TOKEN="$(npx @wix/cli@latest token --site "$VANTOGO_SITE_ID")"

wix_post() {
  local endpoint="$1"
  local payload_file="$2"

  curl --silent --show-error --fail-with-body \
    --request POST "https://www.wixapis.com$endpoint" \
    --header "Authorization: Bearer $VANTOGO_WIX_TOKEN" \
    --header "wix-site-id: $VANTOGO_SITE_ID" \
    --header "Content-Type: application/json" \
    --data-binary "@$payload_file"
}

wix_post "/wix-data/v2/collections" "$VANTOGO_PAYLOAD_DIR/create-vehicles.json" >/dev/null
echo "Created Vehicles collection."

wix_post "/wix-data/v2/collections" "$VANTOGO_PAYLOAD_DIR/create-accessories.json" >/dev/null
echo "Created Accessories collection."

wix_post "/wix-data/v2/collections" "$VANTOGO_PAYLOAD_DIR/create-rental-requests.json" >/dev/null
echo "Created RentalRequests collection."

wix_post "/wix-data/v2/bulk/items/insert" "$VANTOGO_PAYLOAD_DIR/insert-vehicles.json" >/dev/null
echo "Inserted 5 vehicle records."

wix_post "/wix-data/v2/bulk/items/insert" "$VANTOGO_PAYLOAD_DIR/insert-accessories.json" >/dev/null
echo "Inserted 3 accessory records."
