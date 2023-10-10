## Bundle SDK

`yarn run build`

## Test SDK locally

1. Change directory into your Javascript SDK root (*javascript-workspace/sdk/javascript*) and run  `cp package.json ./dist && cd dist && yarn link`
2. Next, Change directory into Javascript SDK example folder (*javascript-workspace/sdk/javascript/example*) and run `yarn link "@websuckit/js"`