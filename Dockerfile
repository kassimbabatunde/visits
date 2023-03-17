FROM node:alpine

WORKDIR /app

COPY package.json /app/
RUN npm i
COPY . /app/
EXPOSE 5000
CMD ["npm","start"]