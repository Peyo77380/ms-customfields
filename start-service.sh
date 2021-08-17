#!/usr/bin/env bash

docker service create --replicas 1 --name ms-customfields-service -l=apiRoute='/custom' -p 3001:3000 --env-file env --env-file env2 lacolloc/ms-customfields