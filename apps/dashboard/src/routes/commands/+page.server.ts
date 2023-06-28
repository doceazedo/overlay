import { commandsDB } from 'db';

export const load = async () => {
	await commandsDB.read();
	return {
		commands: commandsDB.data.commands
	};
};
