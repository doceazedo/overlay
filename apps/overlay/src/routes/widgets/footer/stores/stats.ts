import { writable } from 'svelte/store';

export const STATS = writable({
	followers: 0,
	subscriptions: 0,
	viewers: 0
});
