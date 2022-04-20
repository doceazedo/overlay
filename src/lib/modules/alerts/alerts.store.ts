import { writable } from 'svelte/store';
import { streamlabsAlertListener } from '$lib/modules/streamlabs';
import type { StreamlabsAlert } from '$lib/modules/streamlabs';

// streamlabsAlertListener.subscribe((alert) => {
//   if (alertsQueue.length == 1) nextAlert();
// });

// export const alertsQueue = writable<StreamlabsAlert[]>([]);
