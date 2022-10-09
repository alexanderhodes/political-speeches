[![Docker Build](https://github.com/alexanderhodes/political-speeches/actions/workflows/build.yml/badge.svg)](https://github.com/alexanderhodes/political-speeches/actions/workflows/build.yml)

# Political speeches

## Installation

This application is built using yarn. You can as well run it with npm.

```bash
# install dependencies
$ yarn
# create environment file
$ cp .example.env .env
# start application
$ yarn dev
```

## Running the app in production

For running the app in production the app needs to be built first using `yarn build`. After build the application can be started using `yarn start`.

```bash
# build application
$ yarn build
# run application that was built
$ yarn start
```

## Running the app with csv files

For checking the app two csv files are provided with test data. They are located in the `assets` folder which is included when running the app as well. The test files are available at `example-1.csv` and `example-2.csv`.

For running the app on your local environment with CSV files you can check out these commands. 

```bash
# running the app with single csv file
$ curl "http://localhost:3000/evaluation?url=http://localhost:3000/example-1.csv"
# running the app with multiple csv files
$ curl "http://localhost:3000/evaluation?url=http://localhost:3000/example-1.csv&url=http://localhost:3000/example-2.csv"
```

## Configuring the app

The app can be configured using `.env` file. Next to the `PORT` configuration, you can define the `YEAR` and `TOPIC` for speeches which should be considered.

By default, these values are configured:

```yaml
PORT=3000

YEAR=2012
TOPIC=Internal Security
```
