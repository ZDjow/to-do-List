FROM node:23.11.0-alpine AS build

WORKDIR /app

COPY package*.json .
COPY yarn.lock .

RUN yarn install

COPY . .
RUN yarn build

FROM node:23.11.0-alpine

WORKDIR /app

RUN yarn global add serve

COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["serve", "-s", "/app/build", "-l", "3000"]