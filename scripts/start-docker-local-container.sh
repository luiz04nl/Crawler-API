#!/usr/bin/env bash

docker-compose -f local-docker-compose.yml stop &&
docker-compose -f local-docker-compose.yml down &&
printf y | docker system prune > /dev/null &&
docker-compose -f local-docker-compose.yml up -d &&
docker ps;