FROM node:18-alpine

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY . .
RUN touch .env && chmod 600 .env

RUN yarn

EXPOSE 3001
CMD [ "npm", "start" ]
