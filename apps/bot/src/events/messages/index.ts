import type { ChatUserstate } from 'tmi.js';
import { lurk } from './lurk';

export type MessageEvent = (message: string, isCommand: boolean, user: ChatUserstate) => void;

export const messageEvents = [
  lurk
];
