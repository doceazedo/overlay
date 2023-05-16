import { broadcast } from '../utils';
import { modOnlyCmd } from '../middlewares';
import { AlertEventData } from '../events/events.types';
import type { Command } from '.';

export const faker: Command = {
  aliases: ['faker'],
  exec: (input, args, user) =>
    modOnlyCmd(user, () => {
      broadcast('cmd:faker');
      setTimeout(() => {
        broadcast<AlertEventData>('event:alert', {
          type: 'raid',
          title: `Raid de moovhe4rt!`,
          message: `8 pessoas vieram junto`,
          image: '/assets/img/cat-dancing.gif',
          audio: '/assets/audio/alert-raid.mp3',
        });
      }, 3500);
    }),
};
