FROM node:14-alpine

# create destination directory
RUN mkdir -p /app
WORKDIR /app
# update and install dependency
ADD package.json yarn.lock ./
RUN yarn install
ADD . ./
RUN yarn build
