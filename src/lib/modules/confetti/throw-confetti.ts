import { CONFETTI_DURATION, CONFETTI_TRIGGER } from '.';
import { get } from 'svelte/store';

export const throwConfetti = (duration: number) => {
  CONFETTI_DURATION.set(duration);
  CONFETTI_TRIGGER.set(get(CONFETTI_TRIGGER) + 1);
};
