# FROM node:12.16.1-alpine AS base
FROM buildkite/puppeteer:v1.15.0 AS base

RUN mkdir -p /usr/src/api

WORKDIR /usr/src/api

COPY ./package.json .

RUN yarn
RUN yarn clean

## ####################################################################################

FROM base AS build

WORKDIR /usr/src/api

RUN npm install -g @babel/cli

COPY . .

# Prepare Build
RUN yarn

## Lint
RUN yarn lint

## Build
RUN yarn clean
RUN yarn build

# ####################################################################################

FROM base AS test-unit

WORKDIR /usr/src/api

COPY . .

# Prepare Test
RUN yarn

## Test
RUN yarn unit

# ## ####################################################################################

FROM base AS runtime

WORKDIR /usr/src/api

COPY --from=build /usr/src/api/dist ./dist

RUN rm -rf node_modules
RUN yarn --production

RUN touch /usr/bin/startup.sh

RUN echo '/usr/local/bin/node /usr/src/api/dist/index.js' > /usr/bin/startup.sh
# RUN echo 'sleep 80000' > /usr/bin/startup.sh
RUN chmod +x /usr/bin/startup.sh

EXPOSE 3000

ENTRYPOINT '/usr/bin/startup.sh'