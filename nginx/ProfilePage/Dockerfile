FROM node:16-alpine as build

WORKDIR /app

COPY . .

RUN npm install

ENV NODE_ENV DEV

CMD ["npm", "run", "dev"]

