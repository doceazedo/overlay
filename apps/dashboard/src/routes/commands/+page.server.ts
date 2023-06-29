import { commands } from 'db/models/commands';

export const load = async () => {
	await commands.read();
	return {
		commands: commands.data.commands
	};
};
