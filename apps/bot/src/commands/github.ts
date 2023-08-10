import { createBotReply } from "../commands";
import { SOCIALS } from "../helpers/socials";

const github = createBotReply(["github", "gh", "git"], SOCIALS.GITHUB);

export default github;
