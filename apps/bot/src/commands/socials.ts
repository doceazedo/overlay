import { createBotReply } from "../commands";
import { SOCIALS } from "../helpers/socials";

const social = createBotReply(
  [
    "socials",
    "social",
    "redes",
    "twitter",
    "tt",
    "mastodon",
    "bluesky",
    "instagram",
    "insta",
    "ig",
    "lastfm",
    "last",
  ],
  Object.values(SOCIALS)
);

export default social;
