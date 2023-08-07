FROM node:16-alpine

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 80 443

CMD ["node", "app.js"]
