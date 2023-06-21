import { CONFIG } from 'config';

export const load = () => {
	return {
		clientId: CONFIG.twitchClientId
	};
};
