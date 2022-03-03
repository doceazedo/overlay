import { SHOUTOUT_INFO, SHOUTOUT_SHOW } from '$lib/modules';
import type { ShoutoutInfo } from '$lib/modules';
import { get } from 'svelte/store';

const shoutoutDuration = 10000;

export const shoutout = (info: ShoutoutInfo) => {
  if (get(SHOUTOUT_SHOW)) return;

  SHOUTOUT_SHOW.set(true);
  SHOUTOUT_INFO.set(info);
  setTimeout(() => SHOUTOUT_SHOW.set(false), shoutoutDuration);
};
