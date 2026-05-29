FROM node:24.8.0-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3335

CMD ["sh", "-lc", "npm run dev"]

