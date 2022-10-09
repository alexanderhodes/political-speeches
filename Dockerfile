FROM node:alpine as base

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

RUN yarn && yarn build

CMD ["yarn", "start"]
