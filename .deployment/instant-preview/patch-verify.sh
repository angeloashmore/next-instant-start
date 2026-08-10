#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "${ROOT}"

instant_preview_paths=(
	"src/lib/instant-preview.ts"
	"src/app/api/preview/[repository]"
)

for path in "${instant_preview_paths[@]}"; do
	if [[ -e "${path}" ]]; then
		echo "${path} must not exist in the public starter." >&2
		exit 1
	fi
done

echo "Starter source tree is clean."
