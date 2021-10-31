import { writable } from 'svelte/store';

export const emotes = writable([]);
export const shoutout = writable(null);
export const showShoutout = writable(false);
export const showConfetti = writable(false);