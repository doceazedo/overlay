import { error, json } from '@sveltejs/kit';
import { commands, type CommandData } from 'db/models/commands';

export const POST = async ({ request }) => {
	const data = (await request.json()) as CommandData;

	await commands.read();
	const idx = commands.data.commands.findIndex((cmd) => cmd.name == data.name);

	if (idx >= 0) {
		commands.data.commands[idx] = {
			...commands.data.commands[idx],
			...data
		};
	} else {
		commands.data.commands.push(data);
	}
	await commands.write();

	// TODO: create script file if it does not exists

	return json({ command: commands.data.commands[idx] });
};

export const DELETE = async ({ request }) => {
	const data = (await request.json()) as { name: string };

	await commands.read();
	const idx = commands.data.commands.findIndex((cmd) => cmd.name == data.name);
	if (idx < 0) throw error(404, 'Command not found');

	const command = commands.data.commands[idx];
	commands.data.commands.splice(idx, 1);
	await commands.write();

	// TODO: delete script if it exists

	return json({ command });
};
