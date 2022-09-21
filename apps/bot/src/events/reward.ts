import { playAudioFromFile } from '../utils';
import type {
  EventSubChannelRedemptionAddEvent,
  EventSubListener,
} from '@twurple/eventsub';

type Reward = {
  id: string;
  handler: (e: EventSubChannelRedemptionAddEvent) => void;
};

const rewards: Reward[] = [
  {
    // Hidratação 🥤
    id: 'c541c16d-e4f9-4e91-89dc-e8274402b669',
    handler: () => null,
  },
  {
    // Ele gosta 😍
    id: '3d10e3f6-972b-4c10-81ae-df7721d81131',
    handler: () => playAudioFromFile('ele-gosta.mp3'),
  },
  {
    // Atumalaca 🤣
    id: '10ce76e2-ab74-4766-bfa6-8e3d81b02740',
    handler: () => playAudioFromFile('atumalaca.mp3'),
  },
  {
    // PARE 🤚
    id: '36d2b2c1-19f2-481b-98ae-35a186d9cab0',
    handler: () => playAudioFromFile('pare.mp3'),
  },
  {
    // Cavalo 🐴
    id: 'e2985ae2-aa0b-40e4-a80d-64bcaa1fe07f',
    handler: () => playAudioFromFile('cavalo.mp3'),
  },
  {
    // Que isso, meu filho, calma 😳
    id: 'f9af7672-e5a1-4fcf-b391-6302194d64a7',
    handler: () => playAudioFromFile('que-isso-meu-filho-calma.mp3'),
  },
];

export const rewardEvent = (
  eventSubClient: EventSubListener,
  userId: string
) => {
  const registeredEvents = rewards.map((reward) =>
    eventSubClient.subscribeToChannelRedemptionAddEventsForReward(
      userId,
      reward.id,
      reward.handler
    )
  );
  return registeredEvents[0];
};
