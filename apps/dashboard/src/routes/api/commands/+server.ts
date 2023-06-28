import { error, json } from '@sveltejs/kit';
import { commandsDB, type CommandData } from 'db';

export const POST = async ({ request }) => {
	const data = (await request.json()) as CommandData;

	await commandsDB.read();
	const idx = commandsDB.data.commands.findIndex((cmd) => cmd.name == data.name);

	if (idx >= 0) {
		commandsDB.data.commands[idx] = {
			...commandsDB.data.commands[idx],
			...data
		};
	} else {
		commandsDB.data.commands.push(data);
	}
	await commandsDB.write();

	// TODO: create script file if it does not exists

	return json({ command: commandsDB.data.commands[idx] });
};

export const DELETE = async ({ request }) => {
	const data = (await request.json()) as { name: string };

	await commandsDB.read();
	const idx = commandsDB.data.commands.findIndex((cmd) => cmd.name == data.name);
	if (idx < 0) throw error(404, 'Command not found');

	const command = commandsDB.data.commands[idx];
	commandsDB.data.commands.splice(idx, 1);
	await commandsDB.write();

	// TODO: delete script if it exists

	return json({ command });
};
