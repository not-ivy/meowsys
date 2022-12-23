#!/usr/bin/env bash

source .env

data="$(cat $PATH)"

data="{\"branch\":\"default\",\"modules\":{\"main\": \"$data\"}}"

curl\
 -m 10 \
 -X POST \
 --user "$EMAIL:$PASSWD" \
 -H "Content-Type: application/json; charset=utf-8" \
 -d "$data" \
 "$HOST:$POST/api/user/code"
