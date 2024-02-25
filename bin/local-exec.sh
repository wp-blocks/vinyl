#!/usr/bin/env bash

docker compose --file docker-compose.yml --env-file .env exec -T -w /var/www/html/wp-content/plugins/vinyl wordpress bash $@
