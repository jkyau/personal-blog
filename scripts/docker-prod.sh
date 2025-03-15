#!/bin/bash

# Stop any running containers
docker-compose down

# Build and start the containers in detached mode
docker-compose up --build -d 