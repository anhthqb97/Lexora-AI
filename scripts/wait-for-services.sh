#!/usr/bin/env bash
set -euo pipefail

wait_for() {
  local name="$1"
  local cmd="$2"
  local max="${3:-60}"
  local i=0
  until eval "$cmd"; do
    i=$((i + 1))
    if [ "$i" -ge "$max" ]; then
      echo "Timeout waiting for $name"
      exit 1
    fi
    sleep 1
  done
  echo "$name ready"
}

wait_for "MongoDB" "docker compose exec -T mongodb mongosh --quiet --eval \"db.adminCommand('ping')\" >/dev/null 2>&1" 90
wait_for "Redis" "docker compose exec -T redis redis-cli ping | grep -q PONG" 60
wait_for "Ollama" "curl -sf http://localhost:11434/api/tags >/dev/null" 120
