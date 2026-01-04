FROM node:20

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 10000

CMD ["node", "src/server.js"]
