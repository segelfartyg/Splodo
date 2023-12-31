FROM node:16-alpine

WORKDIR /frontend

COPY . .

WORKDIR /frontend/Splodo.Web.App

RUN npm install

RUN npm run build

EXPOSE 5000

WORKDIR /frontend

RUN npm install

CMD ["node", "app.js"]