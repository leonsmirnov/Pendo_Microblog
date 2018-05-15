FROM node:carbon

WORKDIR /user/src/app

COPY package.json /user/src/app

RUN npm install

COPY . /user/src/app

EXPOSE 3000

CMD ["node", "app.js"]
