# base image
FROM node:11.6

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package.json /usr/src/app/
RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public
ADD scripts /usr/src/app/scripts
ADD config /usr/src/app/config

# start app
CMD ["npm", "start"]
