# Websuckit Javascript Client

[![Test](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/test.yml/badge.svg)](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/test.yml)
[![Deploy to NPM](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/deploy.yml/badge.svg)](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/deploy.yml)

This Websuckit client library supports web browsers and Node.js

For tutorials and more in-depth information about websuckit Channels, visit
our [official docs](https://doc.websuckit.com/javascript_quick_start).

## Usage Overview

The following topics are covered:

* [Installation](https://github.com/websuckit/web-suck-it-js#installation)
  * [Web](https://github.com/websuckit/web-suck-it-js#web)
  * [Node.js](https://github.com/websuckit/web-suck-it-js#nodejs)
* [Initialization](https://github.com/websuckit/web-suck-it-js#initialization)
* [Channels](https://github.com/websuckit/web-suck-it-js#accessing-channels)
  * [Create Channel](https://github.com/websuckit/web-suck-it-js#accessing-channels)
  * [Get Channel](https://github.com/websuckit/web-suck-it-js#accessing-channels)
  * [Get Channels](https://github.com/websuckit/web-suck-it-js#accessing-channels)
  * [Get or Create Channel](https://github.com/websuckit/web-suck-it-js#accessing-channels)
  * [Update Channel](https://github.com/websuckit/web-suck-it-js#accessing-channels)
  * [Delete Channel](https://github.com/websuckit/web-suck-it-js#accessing-channels)
* [Accessing a channel's websocket URL](https://github.com/websuckit/web-suck-it-js#accessing-channels)
## Supported platforms

* Web
  * We test against Chrome, Firefox and Safari.
  * Works [in web pages](https://github.com/websuckit/web-suck-it-js#web), [web
    workers and service
    workers](https://github.com/websuckit/web-suck-it-js#web-workers)
  * Works with all major web frameworks, including
* [Node.js](https://github.com/websuckit/web-suck-it-js#nodejs)

## Installation

### Web

If you're using websuckit Channels on a web page, you can install the library via:

#### Yarn (or NPM)

You can use any NPM-compatible package manager, including NPM itself and Yarn.

```bash
yarn add @websuckit/js
```

Then:

```javascript
import websuckit from '@websuckit/js';
```

Or, if you're not using ES6 modules:

```javascript
const websuckit = require('@websuckit/js');
```

#### CDN

```html
<script src="https://unpkg.com/testsuckit@0.0.7/dist/testsuckit.umd.js"></script>
```

### Node.js

Having installed `@websuckit/js` via an NPM-compatible package manager, run:

```javascript
import websuckit from '@websuckit/js';
```

## Initialization

```js
const ws = new Websuckit({
  userId: USER_ID,
  accessKey: ACCESS_KEY,
  publicKey: PUBLIC_KEY,
})
```


You can get your `USER_ID`, `ACCESS_KEY` and `PUBLIC_KEY` from the [websuckit dashboard](https://websuckit.com/api-keys).

## Channel

### Create channel

```js
const channelResponse = ws.createChannel({
  channel: "channel_name", // channel should be a slug e.g test-channel
})

// Expected response
// {
//     channel: {
//         id: string;
//         name: string;
//         pass_key: string;
//         user_id: string;
//         created_at: string;
//         updated_at: string;
//     }
// }
```

### Get channel

```json
const channelResponse = ws.getChannel({
  channelName: "channel_name",
})

// Expected response
{
  id: string;
  name: string;
  pass_key: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
```

### Get channels (paginated)

```js
const channelResponse = ws.getChannels({
    page: "0", // page is 0 indexed
    per_page: "10",
    search_key: "channel_name"; // (optional) search channels by channel name
})

// Expected response
// {
//    status: boolean
// }
```


## Get or Create channel

```js
const channelResponse = ws.getOrCreateChannel({
  channelName: "channelName", // channel should be a slug e.g test-channel
})

// Expected response
// {
//   id: string;
//   name: string;
//   pass_key: string;
//   user_id: string;
//   created_at: string;
//   updated_at: string;
// }
```

## Update channel

```js
const channelResponse = ws.getOrCreateChannel({
    channelId: "<CHANNEL_UUID>",
    channel: "channel_name"
    regenerate_pass_key: false; // (optional) If regenerate_pass_key is true the channel passkey will be regenerated
})

// Expected response
// {
//     channel: {
//         id: string;
//         name: string;
//         pass_key: string;
//         user_id: string;
//         created_at: string;
//         updated_at: string;
//     }
// }
```

### Delete channel

```js
const channelResponse = ws.getOrCreateChannel({
    channelId: "<CHANNEL_UUID>",
})

// Expected response
// {
//     status: boolean
// }
```


## Accessing a channel's websocket URL

It is possible to access a channel websocket URL by channel name, through the `getConnectionUrl` function:

```js
const connectionUrl = ws.getConnectionUrl({
  channelName: CHANNEL_NAME,
  channelPassKey: CHANNEL_PASSKEY,
})

// The expected return of the connectionUrl is a websocket connection e.g wss://backend.websuckit.com/e762eaad-397b-4af8-9376-a8eff2731966/bright/{encrypted_token}
```

* `channelName` - name of channel
* `channelPassKey` - channel passkey

## Test SDK

`yarn test`

## Run Locally

`yarn install`

`yarn dev`

## Run SDK locally

1. Run  `yarn build && cp package.json ./dist && cd dist && yarn link` in the root directory.
2. Next, Change directory into example folder and run `cd ../example && yarn link "@websuckit/js"`


