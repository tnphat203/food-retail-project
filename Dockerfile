FROM node:20-slim

WORKDIR /usr/src/app

ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_ENV=production

# Nếu dùng Puppeteer
RUN apt-get update && apt-get install -y chromium && \
    rm -rf /var/lib/apt/lists/*
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 10000

CMD ["npm", "start"]
