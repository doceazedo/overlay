import io from 'socket.io-client';
import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { STREAMLABS_SOCKET_API_TOKEN } from '$lib/env';
import { parseStreamlabsEvent } from '.';
import type { StreamlabsAlert, StreamlabsEvent } from './streamlabs.types';

if (browser) {
  const streamlabs = io(
    `https://sockets.streamlabs.com?token=${STREAMLABS_SOCKET_API_TOKEN}`,
    {
      transports: ['websocket'],
    },
  );

  streamlabs.on('event', async (event: StreamlabsEvent) => {
    const data = event?.message?.[0];
    if (!data) return;
    if (
      !['follow', 'subscription', 'donation', 'raid', 'bits'].includes(
        event.type,
      )
    )
      return;

    const alert = await parseStreamlabsEvent(event);
    streamlabsAlertListener.set(alert);
  });
}

export const streamlabsAlertsQueue = writable([]);
export const streamlabsAlertListener = writable<StreamlabsAlert>();
