# PetShop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.5.

### This project includes:

- Unit tests
- State management using Ngxs

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Server side

In order to get a full stack application, I'm using a docker container installed locally to provide a backend.
You can configure it as follow:

- Install docker if you don't have it yet:
  `https://www.docker.com/products/personal/`
- Get the swagger api pet-store as follow:
  `https://hub.docker.com/r/swaggerapi/petstore/`
- Once you pulled the docker image, run the container and that's it, you already have a backend running locally.
- Finally go to pet-shop repo and run it:
  `npm start`
  The application will be running at `http://localhost:4200`
