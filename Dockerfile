FROM --platform=linux/amd64 node:18-alpine as base

WORKDIR /home/node/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build

EXPOSE 3030

CMD [ "npm", "run", "start" ]