import { createBotCommand } from "../commands";

const dice = createBotCommand(["dice"], ({ reply }) => {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  reply(`You rolled a ${diceRoll}`);
});

export default dice;
