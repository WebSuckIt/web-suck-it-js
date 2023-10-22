## Bundle SDK
[![Test](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/test.yml/badge.svg)](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/test.yml)
[![Deploy to NPM](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/deploy.yml/badge.svg)](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/deploy.yml)

`yarn run build`

### Test SDK

`yarn test`

## Run SDK locally

1. Run  `yarn build && cp package.json ./dist && cd dist && yarn link` in the root directory.
2. Next, Change directory into example folder and run `cd ../example && yarn link "@websuckit/js"`
