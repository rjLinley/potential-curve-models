# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=23.0.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.

# RUN apk update || : && apk add --no-cache python3 py3-pip

COPY package*.json ./

RUN npm ci --include=dev

# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm i -g node-gyp \
#     npm i --include=dev \
#     npm i -g vite \
#     npm i @vitejs/plugin-react

# RUN ln -s /usr/src/app/node_modules/ ../node_modules
# RUN ln -s /usr/local/lib/node_modules/ ../node_modules
# Run the application as a non-root user.
# Copy the rest of the source files into the image.
COPY . .

# USER node

# Expose the port that the application listens on.
EXPOSE 5173

# Run the application.
# CMD npm run build

CMD npm run dev