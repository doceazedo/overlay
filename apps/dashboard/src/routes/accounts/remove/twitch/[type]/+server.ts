import { CONFIG } from 'config';
import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const type = params.type;
	if (type != 'broadcaster' && type != 'bot') throw error(400, 'Invalid account type');

	await CONFIG.update({
		twitchBroadcasterId: type == 'broadcaster' ? undefined : CONFIG.twitchBroadcasterId,
		twitchBotId: type == 'bot' ? undefined : CONFIG.twitchBotId
	});

	throw redirect(302, '/accounts');
};
