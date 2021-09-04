<script>
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import { emotes } from '../stores';

  const timeToIdle = 10000;

  let canvas,
      ctx,
      size = 64,
      gravity = 0.1,
      damping = 0.9,
      traction = 0.8,
      hideCanvas = false,
      isHidingCanvas = false,
      positions = [];

  const init = () => {
    if (!browser) return;

    ctx = canvas.getContext("2d");
    canvas.width = 1440;
    canvas.height = 1080;
    renderEmote();
  }
  onMount(() => init());

  const renderEmote = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    positions.forEach((pos, i) => {
      if (pos.cx + size >= canvas.width) {
        positions[i].vx = - pos.vx * damping;
        positions[i].cx = canvas.width - size;
      } else if (pos.cx <= 0) {
        positions[i].vx = - pos.vx * damping;
        positions[i].cx = 0;
      }
      if (pos.cy + size >= canvas.height) {
        positions[i].vy = - pos.vy * damping;
        positions[i].cy = canvas.height - size;
        positions[i].vx *= traction;
      } else if (pos.cy <= 0) {
        positions[i].vy = - pos.vy * damping;
        positions[i].cy = 0;
      }

      positions[i].vy += gravity;
      positions[i].cx += pos.vx;
      positions[i].cy += pos.vy;

      const img = new Image();
      img.src = pos.url;
      ctx.drawImage(img, pos.cx, pos.cy, size, size);
    });
    requestAnimationFrame(renderEmote);
  }

  const randomInt = (min, max) => Math.random() * (max - min) + min;

  const pushEmote = url => {
    positions.push({
      cx: randomInt(0, 1440),
      cy: randomInt(820, 1080),
      vx: randomInt(10, 15),
      vy: randomInt(-15, -10),
      url
    });

    hideCanvas = false;
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(destroyEmotes, timeToIdle);
  }

  const destroyEmotes = () => {
    hideCanvas = true;
    isHidingCanvas = true;
    setTimeout(() => {
      positions = [];
      isHidingCanvas = false;
    }, 800);
  }

  let idleTimeout = setTimeout(destroyEmotes, timeToIdle);

  emotes.subscribe(emotesArr => {
    if (isHidingCanvas) {
      setTimeout(() => emotesArr.forEach(emoteURL => pushEmote(emoteURL)), 800);
    } else {
      emotesArr.forEach(emoteURL => pushEmote(emoteURL));
    }
  });
</script>

<canvas bind:this={canvas} class:hidden={hideCanvas}></canvas>

<style type="text/sass">
  canvas
    transition: all .8s ease

    &.hidden
      opacity: 0
</style>