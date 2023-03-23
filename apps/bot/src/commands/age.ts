import { send } from '../utils';
import type { Command } from '.';

const getAge = (birthday: Date) => {
  const today = new Date();
  const month = today.getMonth() - birthday.getMonth();
  let age = today.getFullYear() - birthday.getFullYear();
  if (month < 0 || (month == 0 && today.getDate() < birthday.getDate())) age--;
  return age;
};

const currentAge = getAge(new Date('2003-01-21'));

export const age: Command = {
  aliases: ['age', 'idade', 'yo', 'yearsold', 'aniversario', 'birthday', 'birthdate'],
  exec: async () => {
    send(`Eu tenho ${currentAge} anos e faço aniversário em 21/01 🎂`);
  },
};
