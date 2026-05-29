FROM node:24.8.0-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["sh", "-lc", "npm run prisma:generate && npm run dev"]
