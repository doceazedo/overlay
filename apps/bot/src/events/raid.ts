import type { EventSubListener } from '@twurple/eventsub';
import { getUser } from '../clients';
import { broadcast, send } from '../utils';
import type { AlertEventData } from './events.types';

export const raidEvent = (eventSubClient: EventSubListener, userId: string) =>
  eventSubClient.subscribeToChannelRaidEventsTo(userId, (e) => {
    send(
      `${e.raidingBroadcasterDisplayName} está fazendo uma raid com ${e.viewers} pessoas! 🎊`
    );
    setTimeout(async () => {
      const data = await getUser(e.raidingBroadcasterDisplayName);
      broadcast('cmd:sh', data);
    }, 5000);
    broadcast<AlertEventData>('event:alert', {
      type: 'raid',
      title: `Raid de ${e.raidingBroadcasterDisplayName}!`,
      message: `${e.viewers} pessoa vieram junto`,
      image: '/assets/img/cat-dancing.gif',
      audio: '/assets/audio/alert-raid.mp3',
    });
  });
