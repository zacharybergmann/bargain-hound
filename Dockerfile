FROM node:7
RUN mkdir /bargain-hound-app
ADD . /bargain-hound-app
WORKDIR /bargain-hound-app
RUN npm i
EXPOSE 80
CMD ["npm", "start"]
