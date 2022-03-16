import io from 'socket.io-client';
import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { STREAMLABS_KEY } from '$lib/env';

if (browser) {
  console.log('Starting streamlabs...');
  const streamlabs = io(
    `https://sockets.streamlabs.com?token=${STREAMLABS_KEY}`,
    {
      transports: ['websocket'],
    },
  );

  streamlabs.on('event', (eventData) => {
    console.log('evento!');
    if (!eventData.for && eventData.type === 'donation') {
      //code to handle donation events
      console.log(eventData.message);
    }
    if (eventData.for === 'twitch_account') {
      switch (eventData.type) {
        case 'follow':
          //code to handle follow events
          console.log(eventData.message);
          break;
        case 'subscription':
          //code to handle subscription events
          console.log(eventData.message);
          break;
        default:
          //default case
          console.log(eventData.message);
      }
    }
  });

  // streamlabsAlertListener.set();
}

export const streamlabsAlertListener = writable();
