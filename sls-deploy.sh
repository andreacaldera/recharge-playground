#!/bin/bash

set -e -x

APP_NAME=$1

if [ -z "$APP_NAME" ]; then 
    echo "Missing app name";
    exit 1
fi

echo "Deploying $1"

rm -fr dist/apps/${APP_NAME}/
pnpm nx build ${APP_NAME}
cp apps/${APP_NAME}/serverless.ts dist/apps/${APP_NAME}/
cd dist/apps/${APP_NAME}/

if [ "$APP_NAME" == "recharge-playground" ]; then
    echo "Installing node modules with npm"
    npm install --omit=dev
fi

sls deploy --stage=dev # todo use param