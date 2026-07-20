#!/usr/bin/env bash
set -euo pipefail

# CI / E2E only need MongoDB + Redis. Full local stack: LEXORA_WAIT_FULL=1

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

if [ "${LEXORA_WAIT_FULL:-0}" = "1" ]; then
  wait_for "Ollama" "curl -sf http://localhost:11434/api/tags >/dev/null" 120
  wait_for "ai-gateway" "curl -sf http://localhost:8081/health >/dev/null" 60
  wait_for "speech-service" "curl -sf http://localhost:8082/health >/dev/null" 60
fi
