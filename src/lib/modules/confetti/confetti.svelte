<script lang="ts">
  import { onMount } from 'svelte';
  import confetti from 'canvas-confetti';
  import { randomInRange } from '$lib/utils';
  import { Confetti } from '$lib/components';
  import { CONFETTI_DURATION, CONFETTI_TRIGGER } from '.';

  let canvas = null;
  const config = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
  };

  onMount(() => {
    canvas.confetti =
      canvas.confetti || confetti.create(canvas, { resize: true });
  });

  const throwConfetti = (duration: number) => {
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);

      canvas?.confetti(
        Object.assign({}, config, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }),
      );
      canvas?.confetti(
        Object.assign({}, config, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }),
      );
    }, 250);
  };

  $: $CONFETTI_TRIGGER, throwConfetti($CONFETTI_DURATION);
</script>

<Confetti bind:canvas />
