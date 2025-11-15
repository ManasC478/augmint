aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 122115995635.dkr.ecr.us-west-2.amazonaws.com
docker buildx build --platform linux/amd64 --provenance=false -t augmint-job-worker:latest . -f Dockerfile.build
docker tag augmint-job-worker:latest 122115995635.dkr.ecr.us-west-2.amazonaws.com/augmint-job-worker:latest
docker push 122115995635.dkr.ecr.us-west-2.amazonaws.com/augmint-job-worker:latest
