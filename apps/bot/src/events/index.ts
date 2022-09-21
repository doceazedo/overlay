import { bitsEvent } from './bits';
import { followEvent } from './follow';
import { raidEvent } from './raid';
import { rewardEvent } from './reward';
import { subscriptionEvent } from './subscription';
import { subscriptionMessageEvent } from './subscription-message';

export const twitchEvents = [
  bitsEvent,
  followEvent,
  raidEvent,
  rewardEvent,
  subscriptionEvent,
  subscriptionMessageEvent,
];
