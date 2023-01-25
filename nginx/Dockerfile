#BUILD FRONTEND IMAGE FOR COPY
FROM node:lts AS frontend
WORKDIR /frontend

COPY /ProfilePage .

RUN npm install

COPY . .

RUN npm run build

# BUILD NGINX IMAGE
FROM ubuntu:18.04

COPY --from=frontend /frontend/public ./home

RUN apt update -y \
    && apt install nginx -y \
    && apt-get install software-properties-common -y \
    && add-apt-repository ppa:certbot/certbot -y \
    && apt-get update -y \
    && apt-get install python-certbot-nginx -y \
    && apt-get clean


EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
