<script>
  import { onMount } from 'svelte';
  import confetti from 'canvas-confetti';

  let canvas;
  const duration = 5000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  onMount(() => {
    console.log(canvas);
    canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);

      canvas.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      canvas.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  });
</script>

<canvas bind:this={canvas}></canvas>

<style lang="sass">
  canvas
    position: absolute
    top: 0
    left: 0
    z-index: 10
    height: 1080px
    width: 1440px
</style>