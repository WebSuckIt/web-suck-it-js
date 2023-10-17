import Websuckit from "@websuckit/js";

const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAvM3bjjUBUpfUZ/anTRVJmOOpmJSJ37hY2tzRCb2MIjtxF7/sUGj2
Ukk9fHsYAT9DmNgiViB386umX5qPYXMl8Ab88nNjslZS2MWtS2WMrNGTKWKRjqxP
yeA713j5ipP5KH3g1n+u+owv2tGaCyHh2x4iWzIV0sdgIjpE6oO3sAtaaHrZqowF
MDAGAV6yZpmgR9sUVKZ9GmoxgSE9DZl7sjlkWzMI2jOSANeSYiyi9H34AAqK5I1T
+KVXBDY8hPnmAdBzxpdnwLWq74/FTl1EveMmm1F6cdLJ07ki3heCKgD1GezPM3hp
1E+7cE3HALdB7sIOe3qa1h+pD5OF7q4EnQIDAQAB
-----END RSA PUBLIC KEY-----
`;

const ws = new Websuckit({
  userId: "e762eaad-397b-4af8-9376-a8eff2731966",
  accessKey: "a0fbimBwa30oyf04qYEE",
  publicKey,
});

const connectionUrl = ws.getConnectionUrl({
  channelName: "bright-abrasive-oxygen",
  channelPassKey: "rERTWqDIs2MT8jlCfC0t",
});

ws.getOrCreateChannel({
  channelName: "bright-abrasive-oxygen",
})
  .then((Response) => console.log({ Response }))
  .catch((e: Error) => console.log({ e: e.message }));

console.log({ connectionUrl });
