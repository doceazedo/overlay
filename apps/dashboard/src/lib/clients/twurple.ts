import { ApiClient } from '@twurple/api';
import { getAuthProvider } from 'twurple-auth';

let twurple: ApiClient;

export const getTwurpleClient = async () => {
	const authProvider = await getAuthProvider();
	if (!authProvider) return null;
	if (!twurple) twurple = new ApiClient({ authProvider });
	return twurple;
};
