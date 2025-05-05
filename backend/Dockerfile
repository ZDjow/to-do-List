FROM node:23.11.0-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 4000

CMD [ "yarn", "start" ]