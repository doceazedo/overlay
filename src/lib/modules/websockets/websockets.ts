import io from 'socket.io-client';
import { WEBSOCKETS_URL } from '$lib/env';

export const socket = io(WEBSOCKETS_URL, {
  transports: ['websocket'],
});
