#!/bin/bash
set -e

node /app/backend/dist/server.js &
backend_pid=$!

nginx -g 'daemon off;' &
nginx_pid=$!

trap 'kill -TERM $backend_pid $nginx_pid 2>/dev/null' TERM INT

wait -n "$backend_pid" "$nginx_pid"
exit_code=$?

kill -TERM $backend_pid $nginx_pid 2>/dev/null
wait $backend_pid $nginx_pid 2>/dev/null

exit $exit_code
