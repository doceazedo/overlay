import { createBotCommand } from "../commands";

const getAge = (birthday: Date) => {
  const today = new Date();
  const month = today.getMonth() - birthday.getMonth();
  let age = today.getFullYear() - birthday.getFullYear();
  if (month < 0 || (month == 0 && today.getDate() < birthday.getDate())) age--;
  return age;
};

const age = createBotCommand(
  ["age", "idade", "aniversario", "birthday"],
  ({ reply }) => {
    const currentAge = getAge(new Date("2003-01-21"));
    reply(`Eu tenho ${currentAge} anos e faço aniversário em 21/01 🎂`);
  }
);

export default age;
