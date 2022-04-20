import type { Word } from 'emotettv';
import type { SimpleIcon } from 'simple-icons';
import type { ChatUserstate } from 'tmi.js';

export type TmiMessage = {
  channel: string;
  tags: ChatUserstate;
  message: string;
  self: boolean;
};

export type ParsedTmiMessage = {
  words: Word[];
} & TmiMessage;

export type MessageAuthor = {
  username: string;
  displayName: string;
  color?: string;
  badges: string[];
  self: boolean;
  id: string;
  pronouns?: string;
  team?: SimpleIcon;
  avatar: string;
};

export type Message = {
  content: Word[];
  author: MessageAuthor;
};

export type ChatTheme = 'dark' | 'light';

export * from './chat.store';
export * from './get-badges';
export * from './get-team';
export { default as ChatMessage } from './chat-message.svelte';
export { default as ChatMessages } from './chat-messages.svelte';
export { default as Chat } from './chat.svelte';
