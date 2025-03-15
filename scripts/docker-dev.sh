#!/bin/bash

# Stop any running containers
echo "Stopping any running containers..."
docker-compose -f docker-compose.dev.yml down

# Check if port 3001 is already in use
if lsof -i :3001 > /dev/null; then
  echo "Port 3001 is already in use. Please free up this port or change the port in docker-compose.dev.yml."
  exit 1
fi

# Build and start the containers in detached mode
echo "Building and starting containers in detached mode..."
docker-compose -f docker-compose.dev.yml up --build -d

# Check if the container is running
echo "Checking container status..."
sleep 5
if docker ps | grep personalblog-app-1 > /dev/null; then
  echo "Container is running!"
  echo "Your application should be available at: http://localhost:3001"
  echo "To view logs, run: docker logs -f personalblog-app-1"
  echo "To stop the container, run: docker-compose -f docker-compose.dev.yml down"
else
  echo "Container failed to start. Check logs with: docker logs personalblog-app-1"
  exit 1
fi
