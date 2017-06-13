# bargain-hound-app

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

Bargain Hound is an application for identifying publically traded stocks that may be a bargain.

  - Gets live updates every 15 seconds for the most up to date information
  - User friendly UI/UX to make it plain simple to identify a bargain stock worth researching further
  - Personalized dashboard for tracking stocks of interest and see if/when they are a bargain

![Bargain Hound Dashboard](./bargainhound.jpg?raw=true "Wireframes")

### Tech

LangSnap uses a number of open source projects to help you learn!:

![Bargain Hound Tech Stack](./bargainhound_tech_stack.jpg?raw=true "Tech Stack")

* [AngularJS] - HTML enhanced for web apps!
* [MongoDB] - managing user information for the app
* [Mongoose] - ORM to help interface between the server and the database
* [NodeJS] - evented I/O for the backend
* [ExpressJS] - fast node.js network app framework
* [Docker] - rapid deployment using containers for environment consistency
* [Digital Ocean] - deployment environment for the live application
* [Yahoo Finance API] - real time CSV financial information consumed by the application

### Models
The MongoDB database uses a single schema, keeping track of each User. Each User has a username, password,
and a list of followed stocks.

### Installation / Config to work locally on project

Bargain Hound is structured to be in two separate parts:
  - Bargain Hound Frontend and Server
  - MongoDB Database

The application can be found at https://github.com/zacharybergmann/bargain-hound-app

To use/contribute to the application:
  - install MongoDB
  - Node version 7.6.0 - 7.10.0 should be used
  - Create a .env file
  - .env file should have:
    - PORT     (dev default was 3000)
    - MONGOURI   (dev default was mongodb://localhost:27017/bargainhound)

Once configured run the following sequence of commands to get started and contribute!:
```sh
npm i
npm run dev
```
(Note: You need to have Nodemon installed to run in development mode. If you do not have Nodemon, install it or use 'npm start' instead)

### Redeploying the application
The application has been Dockerized to assist with consistency across all platforms. As a result, a docker-compose.yml
file should be created in the deploy environment and run to redeploy. The docker-compose.yml file should look similar
to the following but should have the INSERTs should be filled in. Keep in mind that during development the database 
url and other credentials may be acceptable but should be changed for more secure values when moving to production.

version: '2'

services:
  mongodb:
    image: 'bitnami/mongodb:latest'
    ports:
      - "27017:27017"
    environment:
      - MONGODB_USERNAME=my_user
      - MONGODB_PASSWORD=password123
      - MONGODB_DATABASE=my_database


Once this file has been copied and pasted into the deployed environment, docker and docker-compose should be installed
there as well. Once this is done, deployment is done by running the following commands:

```sh
sudo docker-compose pull
sudo docker-compose up -d
```

With these commands, the application should be up and running. If any issues are encountered with database 
seeding, the server can be individually shut down and restarted to try to ensure seeding occurs. The following commands 
should be used to do this:

```sh
sudo docker ps     (find the container id)
sudo docker container stop container CONTAINER_ID_HERE
sudo docker-compose up -d
```

Finally, to shut down the containers before re-pulling new iterations, do the following:
```sh
sudo docker-compose down
sudo docker images     (note the image ids and remove them all with the following command)
sudo docker rmi IMAGE_ID_HERE     (perform rmi--remove image on each image id)
```

After completing this, update the docker.yml file if needed and then re-pulling, etc can be performed with the previous commands.
