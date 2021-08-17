#!/usr/bin/env bash

docker rm -f ms-customfields

docker rmi ms-customfields

docker image prune

docker volume prune

docker build -t ms-customfields .