#!/usr/bin/env bash
set -euo pipefail

echo "Checking MongoDB..."
docker compose exec -T mongodb mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null

echo "Checking Redis..."
docker compose exec -T redis redis-cli ping | grep -q PONG

if [ "${LEXORA_WAIT_FULL:-0}" = "1" ]; then
  echo "Checking Ollama..."
  curl -sf http://localhost:11434/api/tags >/dev/null
fi

echo "All local services OK"
