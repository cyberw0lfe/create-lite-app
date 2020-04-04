# create-lite-app

## Description
create-lite-app is a CLI tool to quickly generate lightweight React applications that are bundled using parcel

## Installation
```
npm i -g create-lite-app
```

## Usage
```
mkdir my-lite-app
cd my-lite-app
create-lite-app #or simply 'cla'
npm run start
```

## Features
- bundle
  - [parcel](https://parceljs.org/)
- test
  - [mocha](https://mochajs.org/)
  - [chai](https://www.chaijs.com/)
  - [enzyme](https://www.npmjs.com/package/enzyme)
- lint
  - [eslint](https://eslint.org/docs/user-guide/getting-started)
    - extends [airbnb](https://www.npmjs.com/package/eslint-config-airbnb) rules
- git hooks
  - [husky](https://www.npmjs.com/package/husky)
- routing
  - [react router](https://reacttraining.com/react-router/web/guides/quick-start)