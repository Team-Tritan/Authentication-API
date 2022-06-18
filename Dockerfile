FROM node:16.16.0

MAINTAINER "Dylan James <github/dylanjamesdev>"

WORKDIR /opt/auth-server
COPY . .

RUN npm install --production --verbose
RUN npm update

EXPOSE 8000 80
RUN npm run build

CMD "npm" "start"