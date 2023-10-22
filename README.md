# Getting Started

### Install packages

`yarn install`
### Bundle SDK

`yarn run build`

### Test SDK

`yarn test`

## Run SDK locally

1. Run  `yarn build && cp package.json ./dist && cd dist && yarn link` in the root directory.
2. Next, Change directory into example folder and run `cd ../example && yarn link "@websuckit/js"`