import Websuckit from "@websuckit/js";

const ws = new Websuckit({ userId: "testing" }).connect({
  publicKey: "string",
  channelName: "string",
  channelPassKey: "string",
  userId: "string",
});
console.log({ ws });
