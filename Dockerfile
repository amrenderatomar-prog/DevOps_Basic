FROM node:20-alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /app

COPY src/package*.json ./
RUN npm install

COPY .env .
COPY src/ .

USER app

EXPOSE 3000
CMD ["node", "app.js"]
