FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install

ENV NODE_ENV DEV

EXPOSE 8080

CMD ["npm", "run", "dev"]