import type { Word } from 'emotettv';
import type { ChatUserstate } from 'tmi.js';

export type TmiMessage = {
  channel: string;
  tags: ChatUserstate;
  message: string;
  self: boolean;
};

export type MessageAuthor = {
  username: string;
  displayName: string;
  color?: string;
  badges: string[];
  self: boolean;
  id: string;
  // TODO: get these from the UserResponse type:
  pronouns?: string;
  team?: string;
  avatar: string;
};

export type Message = {
  content: Word[];
  author: MessageAuthor;
};

export * from './chat.store';
export { default as ChatMessages } from './chat-messages.svelte';
export { default as Chat } from './chat.svelte';
