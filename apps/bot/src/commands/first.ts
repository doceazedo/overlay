import { createBotCommand } from "@twurple/easy-bot";
import { first } from "db/models/first";

export const dateHasPassed = (date: Date, hours = 1) => {
  const now = Date.now();
  const time = date.getTime();
  const ttl = 1000 * 60 * 60 * hours;
  return now - time > ttl;
};

const firstCmd = createBotCommand("first", async (params, ctx) => {
  await first.read();
  if (
    first.data.first &&
    !dateHasPassed(new Date(first.data.first.redeemedAt), 8)
  ) {
    return ctx.reply(
      `Tarde demais, @${first.data.first.displayName} chegou antes de você! 🏃`
    );
  }
  first.data.first = {
    displayName: ctx.userDisplayName,
    redeemedAt: new Date().toISOString(),
  };
  const counter = first.data.ranking[ctx.userId] || 0;
  first.data.ranking[ctx.userId] = counter + 1;
  await first.write();
  ctx.say(`@${ctx.userDisplayName} foi a primeira pessoa a chegar! 🏃🏁🎊`);
});

export default firstCmd;
