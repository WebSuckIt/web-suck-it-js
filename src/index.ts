import { Base } from "./base";
import { Channels } from "./channels";
import { applyMixins } from "./utils";

class Websuckit extends Base {}
interface Websuckit extends Channels {}

applyMixins(Websuckit, [Channels]);

export default Websuckit;
