#!/bin/sh

# Turn on echoing and exit on error
set -e

# 1. Start the Node.js backend server in the background
echo "Starting Node.js backend server..."
node /app/backend/server.js &

# 2. Start Nginx in the foreground
echo "Starting Nginx server..."
nginx -g 'daemon off;'