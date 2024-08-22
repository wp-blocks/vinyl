#!/usr/bin/env bash

# This script will open a shell in the appserver container.

docker compose --file docker-compose.yml --env-file .env exec -w /var/www/html wordpress bash
