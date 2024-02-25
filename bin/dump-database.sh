#!/usr/bin/env bash

mkdir -p tmp/database
docker compose --file docker-compose.yml --env-file .env exec database /usr/bin/mysqldump -uwordpress -pwordpress wordpress > tmp/database/dump.sql
