import { writable } from 'svelte/store';

export const CURRENT_SONG = writable<string | null>(null);
