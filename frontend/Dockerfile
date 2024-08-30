FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm i -g serve

COPY . .

ENV VITE_API_ENDPOINT http://localhost:8080

RUN npm run build
EXPOSE 3000

CMD ["serve", "-s", "dist"]