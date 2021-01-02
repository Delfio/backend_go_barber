FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .
RUN npm run typeorm migration:run

EXPOSE 3333

CMD [ "npm", "run", "server:start" ]
