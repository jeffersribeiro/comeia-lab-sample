#!/bin/bash
set -e

PROJECT_ID=
SERVICE_NAME=
CURRENT_BRANCH=$(git branch --show-current | tr '[:upper:]' '[:lower:]')
COMMIT_ID=$(git rev-parse --verify HEAD)

docker build -t gcr.io/$PROJECT_ID/$SERVICE_NAME:$COMMIT_ID .

docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:$COMMIT_ID

gcloud run deploy $SERVICE_NAME \
            --image=gcr.io/$PROJECT_ID/$SERVICE_NAME:$COMMIT_ID \
            --platform=managed \
            --allow-unauthenticated \
            --port=3333 \
            --memory=512Mi \
            --timeout=60 \
            --region=us-east1 \
            --max-instances=1 \
            --project=$PROJECT_ID