# MS-CUSTOM-FIELDS

## About
This NodeJs API is part of several microservices I contributed to.
It is made to handle custom fields in case of an app which uses white label. 

## Project installation
### With composer
1. Clone project : `git clone https://github.com/Peyo77380/ms-customfields`
2. Install dependencies : 
    *  Go to the directory `cd ms-customfields`
    *  Install with npm `npm install`
3. Run dev server : `npm run serve`

You will need a MongoDb database and Redis in order to execute the microservice as it currently is is.
You can use the docker build to directly add Redis to the installation.
### With Docker
Build and launch the app : `docker-compose up --build`
