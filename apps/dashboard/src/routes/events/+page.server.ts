import { events } from 'db/models/events';

const allEvents = [
	{ event: 'raid', label: 'Raid' },
	{ event: 'sub', label: 'Subscription' },
	{ event: 'giftsub', label: 'Gifted Subscription' },
	{ event: 'follow', label: 'Follow' }
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
