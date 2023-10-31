# Websuckit Javascript Client

[![Test](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/test.yml/badge.svg)](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/test.yml)
[![Deploy to NPM](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/deploy.yml/badge.svg)](https://github.com/WebSuckIt/web-suck-it-js/actions/workflows/deploy.yml)

This Websuckit client library supports web browsers and Node.js

For tutorials and more in-depth information about websuckit Channels, visit
our [official docs](https://docs.websuckit.com).

## Usage Overview

The following topics are covered:

* [Installation](https://github.com/WebSuckIt/web-suck-it-js#installation)
  * [Web](https://github.com/WebSuckIt/web-suck-it-js#web)
  * [Node.js](https://github.com/WebSuckIt/web-suck-it-js#web)
* [Initialization](https://github.com/websuckit/web-suck-it-js#initialization)
* [Channels](https://github.com/WebSuckIt/web-suck-it-js#channel)
  * [Create Channel](https://github.com/WebSuckIt/web-suck-it-js#channel)
  * [Get Channel](https://github.com/WebSuckIt/web-suck-it-js#channel)
  * [Get Channels](https://github.com/WebSuckIt/web-suck-it-js#get-channels-paginated)
  * [Get or Create Channel](https://github.com/WebSuckIt/web-suck-it-js#get-or-create-channel)
  * [Update Channel](https://github.com/WebSuckIt/web-suck-it-js#update-channel)
  * [Delete Channel](https://github.com/WebSuckIt/web-suck-it-js#delete-channel)
  * [Accessing a channel's websocket URL](https://github.com/WebSuckIt/web-suck-it-js#accessing-a-channels-websocket-url)
## Supported platforms

* Web
  * We test against Chrome, Firefox and Safari.
  * Works [in web pages](https://github.com/WebSuckIt/web-suck-it-js#accessing-a-channels-websocket-url).
  * Works with major web frameworks, including
* [Node.js](https://github.com/WebSuckIt/web-suck-it-js#accessing-a-channels-websocket-url)

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
import Websuckit from '@websuckit/js';
```

Or, if you're not using ES6 modules:

```javascript
const Websuckit = require('@websuckit/js');
```

#### CDN

```html
<script src="https://unpkg.com/@websuckit/js/dist/websuckit.umd.js"></script>
```

### Node.js

Having installed `@websuckit/js` via an NPM-compatible package manager, run:

```javascript
import Websuckit from '@websuckit/js';
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

```js
const channelResponse = ws.getChannel({
  channelName: "channel_name",
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

### Get channels (paginated)

```js
const channelResponse = ws.getChannels({
    page: "0", // page is 0 indexed
    per_page: "10",
    search_key: "channel_name"; // (optional) search channels by channel name
})

// Expected response
// {
//   id: string;
//   name: string;
//   pass_key: string;
//   user_id: string;
//   created_at: string;
//   updated_at: string;
// }[]
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
const channelResponse = ws.deleteChannel({
    channelId: "<CHANNEL_UUID>",
})

// Expected response
// string
```

## Accessing a channel's websocket URL

It is possible to access a channel websocket URL by channel name, through the `getConnectionUrl` function:

```js
const connectionUrl = ws.getConnectionUrl({
  channelName: CHANNEL_NAME,
  channelPassKey: CHANNEL_PASSKEY,
})

// The expected return of the connectionUrl is a websocket connection e.g {ok: true, value: wss://backend.websuckit.com/e762eaad-397b-4af8-9376-a8eff2731966/bright/{encrypted_token}}
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
