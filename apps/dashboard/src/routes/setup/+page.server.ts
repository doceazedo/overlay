import { CONFIG } from 'config';
import { redirect } from '@sveltejs/kit';

export const load = () => ({
	twitchClientId: CONFIG.twitchClientId || '',
	twitchClientSecret: CONFIG.twitchClientSecret || '',
	twitchChannelName: CONFIG.twitchChannelName || ''
});

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const twitchClientId = data.get('twitch_client_id')?.toString();
		const twitchClientSecret = data.get('twitch_client_secret')?.toString();

		CONFIG.update({
			twitchClientId,
			twitchClientSecret
		});

		throw redirect(302, '/accounts');
	}
};
