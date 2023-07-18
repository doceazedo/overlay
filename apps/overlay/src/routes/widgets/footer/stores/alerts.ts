import { get, writable } from 'svelte/store';
import { uid } from 'uid';
import { socket } from 'ws-client';
import { sleep } from '$lib/utils/sleep';

type FollowEvent = {
	type: 'follow';
	userDisplayName: string;
};

type SubEvent = {
	type: 'sub';
	userDisplayName: string;
	isPrime: boolean;
};

type ResubEvent = {
	type: 'resub';
	userDisplayName: string;
	months: number;
	isPrime: boolean;
};

type RaidEvent = {
	type: 'raid';
	userDisplayName: string;
	raiders: number;
};

type ChannelEvent = FollowEvent | SubEvent | ResubEvent | RaidEvent;

export type Alert = {
	id: string;
	duration: number;
} & ChannelEvent;

export const ALERTS = writable<Alert[]>([]);
export let activeAlert: string | null = null;

const ALERT_DURATION_MAP = {
	follow: 5000,
	sub: 8000,
	resub: 8000,
	raid: 10000
};

export const queueAlert = (data: ChannelEvent) => {
	const id = uid();
	ALERTS.update((queue) => [
		...queue,
		{
			id,
			duration: ALERT_DURATION_MAP[data.type],
			...data
		}
	]);
	if (!activeAlert) nextAlert(id);
};

const nextAlert = async (id: string) => {
	activeAlert = id;
	const alert = get(ALERTS)[0];
	await sleep(alert.duration);
	ALERTS.update((queue) => queue.splice(1));
	const queue = get(ALERTS);
	if (!queue.length) {
		activeAlert = null;
		return;
	}
	nextAlert(queue[0].id);
};

socket.on('event', async (data) => {
	queueAlert(data);
});
