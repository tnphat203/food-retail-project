FROM node:20

WORKDIR /usr/src/app

ENV NPM_CONFIG_LOGLEVEL=warn

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 10000

CMD ["node", "src/server.js"]
