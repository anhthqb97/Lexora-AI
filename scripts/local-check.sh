#!/usr/bin/env bash
set -euo pipefail

echo "Checking MongoDB..."
docker compose exec -T mongodb mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null

echo "Checking Redis..."
docker compose exec -T redis redis-cli ping | grep -q PONG

echo "Checking Ollama..."
curl -sf http://localhost:11434/api/tags >/dev/null

echo "All local services OK"
