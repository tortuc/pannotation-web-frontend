# Pannotation Web Frontend

## Requirements

* node.js v10.9 or grater

## Tech

Pannotation app uses a number of open source projects to work properly:

* [Angular](https://angular.io/) - a framework for creating SPA
* [TypeScript](https://www.typescriptlang.org/) - a typed superset of JavaScript that compiles to plain JavaScript

## Installation

Pannotation app requires [Node.js](https://nodejs.org/) v10.9+ to build.
Install the dependencies and devDependencies and start the server.

```
$ cd marketplace-web-frontend
$ npm install
```

## Configuration

### Available environment
- `dev`
- `stage`
- `production`

### Production configuration

Copy `src/environments/environment.ts` to `src/environments/environment.prod.ts` if such file does not exist. Update file `src/environments/environment.prod.ts` according to your configurations.

```
in case of `dev` or `stage` environment, name of file should be `environment.dev.ts` or `environment.stage.ts`
```

## Deploying

### Build with dev or stage configuration

For dev build use:
```
$ npm run build -- -c dev
```

For stage build use:
```
$ npm run build -- -c stage
```

### Production build

* Build source code using npm scripts:

```
$ npm run build:prod
```

*Note: Production configuration uses file `src/environments/environment.prod.ts` as its environment*

Build is placed to `dist/market-en` folder and ready for being served by server (nginx, apache, node, etc.)

You can also specify a folder where you want to build the application:

```
$ npm run build:prod -- --output-path /path/to/folder
```

*Note: `--` are required for providing additional parameters with npm scrips.*
