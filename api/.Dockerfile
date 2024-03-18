FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
ENV version=14
COPY . .

EXPOSE 3000

CMD ["node", "app.js"] 