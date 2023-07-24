#!/bin/bash

APP_NAME=$1

if [ -z "$APP_NAME" ]; then 
    echo "Missing app name";
    exit 1
fi

echo "Deploying $1"


cp apps/${APP_NAME}/serverless.yml dist/apps/${APP_NAME}/
cd dist/apps/${APP_NAME}/
npm install --production
sls deploy
