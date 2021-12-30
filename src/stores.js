import { writable } from 'svelte/store';

export const emotes = writable([]);
export const shoutout = writable(null);
export const showShoutout = writable(false);
export const showConfetti = writable(false);
export const songDetails = writable(null);
export const showSongDetails = writable(false);
export const showArtist = writable(false);
export const isPlayingOsu = writable(false);