#!/usr/bin/env bash

docker compose --file docker-compose.yml --env-file .env up --detach
docker compose --file docker-compose.yml --env-file .env exec -T wordpress mkdir -p wp-content/uploads
docker compose --file docker-compose.yml --env-file .env exec -T wordpress chown www-data:www-data wp-content wp-content/plugins wp-content/themes wp-content/uploads
./bin/wait-for-it.sh localhost:3389
