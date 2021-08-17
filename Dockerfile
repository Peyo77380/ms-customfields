FROM node:14.15.4-alpine

WORKDIR /app 

COPY . /app

RUN npm cache clean --force && npm install -g --silent --progress=false && npm install -g nodemon

EXPOSE 3000 

CMD [ "npm", "run","serve" ] 