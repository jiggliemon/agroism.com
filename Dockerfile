FROM node:carbon

# Create app directory
WORKDIR /root/src

# Install nodemon for hot reload
RUN npm install -g nodemon mocha

RUN echo 'alias ll="ls -n"' >> ~/.bashrc

RUN add-apt repository ppa:/certbot/certbot
RUN apt-get install letsencrypt

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
EXPOSE 5050