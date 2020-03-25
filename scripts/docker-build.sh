#!/usr/bin/env bash

# echo 'Clear Local Tags'
# git tag -d $(git tag -l)

# echo 'Get Remote Tags'
# git fetch origin

COMMIT_HASH=`git rev-parse HEAD`

CURRENT_VERSION=`git tag | sed 's/-.*//g' | sed 's/[^0-9]//g' | sort --version-sort | tail -1` 
CURRENT_VERSION=${CURRENT_VERSION:-"0"}

DOCKER_IMAGE_NAME='crawler-api'

IMAGE_TAG=$((CURRENT_VERSION + 1))

echo 'Current Tag '${CURRENT_VERSION}
echo 'Next Tag '${IMAGE_TAG}

# git tag $IMAGE_TAG &&

REPOSITORY_URI=luiz04nl/$DOCKER_IMAGE_NAME

############## Build

docker-compose -f build-docker-compose.yml build &&

# echo y | docker system prune &&

docker tag ${DOCKER_IMAGE_NAME}:latest ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}
docker tag ${DOCKER_IMAGE_NAME}:latest ${REPOSITORY_URI}:latest
docker tag ${DOCKER_IMAGE_NAME}:latest ${REPOSITORY_URI}:${IMAGE_TAG}

# docker login &&

docker push ${REPOSITORY_URI}:latest &&
docker push ${REPOSITORY_URI}:${IMAGE_TAG} &&

# git push --tags &&

# ######################

echo 'Finish'