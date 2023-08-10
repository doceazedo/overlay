import { createBotReply } from "../commands";

const dog = createBotReply(
  ["dog", "panda", "cachorro", "cachorra"],
  "A cachorrinha aí atrás é uma vira-lata chamada Panda! 🐶🐼"
);

export default dog;
