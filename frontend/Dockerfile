FROM node:23.11.0-alpine AS build

WORKDIR /app

COPY package*.json .
COPY yarn.lock .

RUN yarn install
RUN yarn global add serve
COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "serve", "-s", "/app/build", "-l", "3000"]