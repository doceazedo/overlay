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
		const twitchChannelName = data.get('twitch_channel_name')?.toString();

		CONFIG.update({
			twitchClientId,
			twitchClientSecret,
			twitchChannelName
		});

		throw redirect(302, '/accounts');
	}
};
