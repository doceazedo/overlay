import { createBotCommand } from "../commands";

const slap = createBotCommand(["slap"], (ctx) => {
  ctx.say(
    `${ctx.user} slaps ${ctx.params.join(" ")} around a bit with a large trout`
  );
});

export default slap;
