# specify the node base image with your desired version node:<version>
FROM node:16
# replace this with your application's default port

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 10100

CMD [ "node", "./build/index.js" ]