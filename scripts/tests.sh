#!/usr/bin/env bash

yarn lint

yarn unit
# export NODE_ENV='test' && jest --detectOpenHandles src/api/product/MercadoLivrePage.spec.js

yarn test-integration-postman

