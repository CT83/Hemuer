FROM node:13.10.1
WORKDIR /usr/app
COPY wait-for-it.sh /usr/app
RUN chmod 777 wait-for-it.sh
COPY package.json . 
RUN npm install
COPY . .