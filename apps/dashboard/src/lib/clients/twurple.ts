import { ApiClient } from '@twurple/api';
import { getAuthProvider } from 'twurple-auth';

const authProvider = await getAuthProvider();

export const twurple = new ApiClient({ authProvider });
