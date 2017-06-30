#!/usr/bin/env bash

curl -H "Content-Type: application/json" -X POST \
-d '{"username":"Edouard", "password":"123456789"}'  \
-H 'accept: application/json' http://127.0.0.1:3000/user

curl -H "Content-Type: application/json" -X POST \
-d '{"name":"Trello"}'  \
-H 'accept: application/json' http://127.0.0.1:3000/service

curl -H "Content-Type: application/json" -X POST \
-d '{"service":1, "user": "1"}'  \
-H 'accept: application/json' http://127.0.0.1:3000/servicelink
