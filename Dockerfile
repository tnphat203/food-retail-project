FROM node:20

WORKDIR /usr/src/app

ENV NODE_ENV=development
ENV NPM_CONFIG_LOGLEVEL=warn

RUN apt-get update && apt-get install -y chromium && \
    rm -rf /var/lib/apt/lists/*
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 10000

CMD ["npm", "run", "dev"]
