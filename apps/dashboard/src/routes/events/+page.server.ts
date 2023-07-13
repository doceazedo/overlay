import { events } from 'db/models/events';

const allEvents = [
	{ event: 'follow', label: 'Follow' },
	{ event: 'sub', label: 'Subscription' },
	{ event: 'giftsub', label: 'Gifted Subscription' },
	{ event: 'raid', label: 'Raid' }
];

export const load = async () => {
	await events.read();
	return {
		events: allEvents.map((event) => ({
			...event,
			actions: events.data.events.find((x) => x.event == event.event)?.actions || []
		}))
	};
};
