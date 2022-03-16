import { browser } from '$app/env';
import { writable } from 'svelte/store';
import tmi from '@coldino/tmi.js-clientonly-fork';
import { CHANNEL_NAME, CHANNEL_ID } from '$lib/env';
import { parseEmotes } from 'emotettv';
import type { Client } from 'tmi.js';
import type { ParsedTmiMessage } from '.';

if (browser) {
  const client: Client = new tmi.Client({
    channels: [CHANNEL_NAME],
  });

  client.connect();

  client.on('message', async (channel, tags, message, self) => {
    const words = await parseEmotes(message, tags.emotes, CHANNEL_ID);

    chatMessageListener.set({
      channel,
      tags,
      message,
      self,
      words,
    });
  });
}

export const chatMessageListener = writable<ParsedTmiMessage>();
