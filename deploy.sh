#!/usr/bin/env bash

source .env

rm -rf dist && mkdir dist

swc src/index.ts -o dist/index.js

data="$(cat dist/index.js)"

data="{\"branch\":\"default\",\"modules\":{\"main\": \"$data\"}}"

curl\
 -m 10 \
 -X POST \
 --user "$EMAIL:$PASSWD" \
 -H "Content-Type: application/json; charset=utf-8" \
 -d "$data" \
 "https://$HOST:$POST/api/user/code"
