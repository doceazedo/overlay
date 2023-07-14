import { createBotCommand } from "@twurple/easy-bot";

const slap = createBotCommand("slap", (params, { userName, say }) => {
  say(`${userName} slaps ${params.join(" ")} around a bit with a large trout`);
});

export default slap;
