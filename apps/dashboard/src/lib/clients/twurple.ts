import { ApiClient } from '@twurple/api';
import { getAuthProvider } from 'twurple-auth';

export const authProvider = await getAuthProvider();

export const twurple = new ApiClient({ authProvider });
