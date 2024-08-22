#!/usr/bin/env bash

docker compose --file docker-compose.yml --env-file .env exec -w /var/www/html/wp-content/plugins/vinyl wordpress bash -c "vendor/bin/wp --allow-root shell"
