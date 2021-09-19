import { browser } from '$app/env';
import { STREAMLABS_KEY } from '../env';

export default function alertsWS () {
  if (!browser) return;
  return window.io(`https://sockets.streamlabs.com?token=${STREAMLABS_KEY}`, {transports: ['websocket']});
}