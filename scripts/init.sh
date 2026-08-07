#!/usr/bin/env bash
# Bring a cold checkout to green in one command, so a loop can tell its own
# breakage from pre-existing breakage.
set -euo pipefail
cd "$(dirname "$0")/.."

node_major="$(node --version | sed 's/^v\([0-9]*\).*/\1/')"
if [ "$node_major" -lt 22 ]; then
  echo "Node 22+ required, found $(node --version)." >&2
  exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
  if command -v corepack >/dev/null 2>&1; then
    corepack enable pnpm
  else
    echo "pnpm not found and corepack unavailable. Install pnpm: https://pnpm.io/installation" >&2
    exit 1
  fi
fi

pnpm install --frozen-lockfile
exec scripts/verify.sh
