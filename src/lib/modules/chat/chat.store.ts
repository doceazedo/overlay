import { browser } from '$app/env';
import { writable } from 'svelte/store';
import tmi from '@coldino/tmi.js-clientonly-fork';
import { CHANNEL_NAME } from '$lib/env';
import type { Client } from 'tmi.js';
import type { TmiMessage } from '.';

if (browser) {
  const client: Client = new tmi.Client({
    channels: [CHANNEL_NAME],
  });

  client.connect();

  client.on('message', (channel, tags, message, self) => {
    chatMessageListener.set({
      channel,
      tags,
      message,
      self,
    });
  });
}

export const chatMessageListener = writable<TmiMessage>();
