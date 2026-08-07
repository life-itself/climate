#!/usr/bin/env bash
# The done condition. Exit 0 means the tree is structurally sound.
#
# This gates ONLY machine-decidable invariants. Judgement calls live in
# docs/review-queue.md. Never weaken a check here to make something pass —
# mark it passes: false in docs/features.yaml with a reason instead.
set -euo pipefail
cd "$(dirname "$0")/.."

node --test scripts/check.test.mjs
node scripts/check.mjs .
