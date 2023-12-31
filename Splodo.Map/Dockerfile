FROM node:16-alpine

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 4000

CMD ["node", "app.js"]