#!/bin/bash
export PATH="/Users/bea/.nvm/versions/node/v24.14.0/bin:$PATH"
cd "$(dirname "$0")"
npx vite --port 5173
