# profit-tool

Profit tool is a training module which consists of /front-end and a /service part.
The idea of the tool is to calculate best profit solution for a give period of time
startDate and endDate with the ideal difference with stock price.

## Prerequisites 
    *nodejs LTS (project was built for v18.12.1)
    *.env file  for both front-end and service

### How to run the project
Back-end .env or .env.dev file requires the database info:
```
mongo.auth.user = ""
mongo.auth.password = ""
mongo.url = ""
PORT= "" //Port is optional if not populated it will run on 8000
```

Starting the Back-end:
```
cd /service
touch .env && chmod 600 .env
yarn
yarn start 
or 
yarn start:dev 
```

Front-end .env or .env.dev file requires the api url:
```
REACT_APP_API_URL="http://localhost:8000/api/v1"
```

Starting the Front-end:
```
cd /front-end
touch .env && chmod 600 .env
yarn
yarn start 
or 
yarn start:dev 
```

Runing back-end tests:
```
cd /service
touch .env && chmod 600 .env
yarn
yarn test 
or 
yarn test:coverage 
```

Seeding the back-end data. It takes a few minutes for the service to generate 10 days of data.
```
curl --location 'localhost:8000/api/v1/generate' \
--header 'Content-Type: application/json' \
--data '{
    "startDate": "2023-07-15T00:21:00.000Z",
    "endDate": "2023-07-24T00:00:00.000Z"
}'
```

To run the back-end in isolated environment:
```
cd infrastructure/docker
docker-compose up -D
```
You have to seed the new data after that because it will use a new database and
update the front-end api url to match the container exposed port and url.