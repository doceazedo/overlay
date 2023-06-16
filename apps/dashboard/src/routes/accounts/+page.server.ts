import { env } from '$env/dynamic/private';

export const load = () => {
	return {
		clientId: env.TWITCH_CLIENT_ID
	};
};
