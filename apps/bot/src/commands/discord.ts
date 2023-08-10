import { createBotReply } from "../commands";
import { SOCIALS } from "../helpers/socials";

const discord = createBotReply(["discord", "disc", "dc"], SOCIALS.DISCORD);

export default discord;
