#!/usr/bin/env bash
set -euo pipefail
docker compose exec -T ollama ollama pull "${OLLAMA_MODEL:-llama3.2:3b}"
