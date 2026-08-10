#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PATCH_FILE="${SCRIPT_DIR}/instant-preview.patch"

cd "${ROOT}"

if [[ ! -f "${PATCH_FILE}" ]]; then
	echo "Patch file not found: ${PATCH_FILE}" >&2
	exit 1
fi

if ! git apply --check "${PATCH_FILE}" 2>/dev/null; then
	echo "Instant preview patch conflicts with the current starter src/." >&2
	echo "Regenerate the patch file after updating src/." >&2
	exit 1
fi

git apply "${PATCH_FILE}"

COMMIT_SHA="$(git rev-parse HEAD 2>/dev/null || echo unknown)"
echo "Applied instant preview patch (commit=${COMMIT_SHA})"
