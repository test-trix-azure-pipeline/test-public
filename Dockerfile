# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:16-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# ENVS holds the full multi-line contents of the Key Vault secret (see
# deploy.yml), baked into the image as a file so the app can parse it into
# individual KEY=VALUE vars at startup.
ARG ENVS
RUN printf '%s' "$ENVS" > /.env

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "npm", "start" ]