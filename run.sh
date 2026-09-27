#!/usr/bin/env bash

set -o errexit

cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $(jobs -p) 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting Backend..."
(cd "$ROOT_DIR/backend" && pnpm run dev) &

echo "Starting Frontend..."
(cd "$ROOT_DIR/frontend" && pnpm run dev) &

wait