import { CONFIG } from 'config';

export const load = ({ locals }) => {
	return {
		twitchClientId: CONFIG.twitchClientId,
		twitchBroadcasterUser: locals.twitchBroadcasterUser,
		twitchBotUser: locals.twitchBotUser
	};
};
