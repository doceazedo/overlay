import { get, writable } from 'svelte/store';
import { uid } from 'uid';
import { socket } from 'ws-client';
import { sleep } from '$lib/utils/sleep';

export const ALERTS = writable<any[]>([]);
export let activeAlert: string | null = null;

socket.on('event', async (data) => {
	queueAlert(data);
});

export const queueAlert = (data: any) => {
	const id = uid();
	ALERTS.update((queue) => [
		...queue,
		{
			id,
			...data
		}
	]);
	if (!activeAlert) nextAlert(id);
};

const nextAlert = async (id: string) => {
	activeAlert = id;
	await sleep(5000);
	ALERTS.update((queue) => queue.splice(1));
	const queue = get(ALERTS);
	if (!queue.length) {
		activeAlert = null;
		return;
	}
	nextAlert(queue[0].id);
};
