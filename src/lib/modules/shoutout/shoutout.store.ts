import { writable } from 'svelte/store';
import type { ShoutoutInfo } from '.';

export const SHOUTOUT_INFO = writable<ShoutoutInfo>();
export const SHOUTOUT_SHOW = writable(false);
