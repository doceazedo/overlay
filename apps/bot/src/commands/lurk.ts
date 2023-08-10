import { createBotCommand } from "../commands";
import { lurkers } from "../stores/lurkers";

const lurk = createBotCommand(["lurk"], ({ msg, say }) => {
  lurkers.add(msg.userInfo.userId);
  say(`@${msg.userInfo.displayName} está lurkeando 😶‍🌫️`);
});

export default lurk;
