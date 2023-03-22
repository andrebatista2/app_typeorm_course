FROM node:18-alpine

RUN apk add --no-cache bash
RUN npm install -g @nestjs/cli yarn

USER node
WORKDIR /home/node/app
