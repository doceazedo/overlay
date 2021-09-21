<script>
  import { browser } from '$app/env';

  let wallWidth = 1440,
      wallHeight = 900,
      size = 64,
      gravity = 0.1,
      damping = 0.9,
      traction = 0.8,
      emotes = [],
      idleTimeout = setTimeout(() => emotes = [], 11000);

  const renderEmote = () => {
    emotes.forEach((pos, i) => {
      if (pos.cx + size >= wallWidth) {
        emotes[i].vx = - pos.vx * damping;
        emotes[i].cx = wallWidth - size;
      } else if (pos.cx <= 0) {
        emotes[i].vx = - pos.vx * damping;
        emotes[i].cx = 0;
      }
      if (pos.cy + size >= wallHeight) {
        emotes[i].vy = - pos.vy * damping;
        emotes[i].cy = wallHeight - size;
        emotes[i].vx *= traction;
      } else if (pos.cy <= 0) {
        emotes[i].vy = - pos.vy * damping;
        emotes[i].cy = 0;
      }

      emotes[i].vy += gravity;
      emotes[i].cx += pos.vx;
      emotes[i].cy += pos.vy;
    });

    emotes = emotes;
  }
  setInterval(renderEmote, 1000 / 75);

  const randomInt = (min, max) => Math.random() * (max - min) + min;
  const randomHash = () => (Math.random() + 1).toString(36).substring(7);

  if (browser) {
    window.pushEmote = (url = 'https://cdn.betterttv.net/emote/5f1b0186cf6d2144653d2970/3x') => {
      const id = randomHash();
      emotes.push({
        cx: randomInt(0, 1440),
        cy: randomInt(820, 1080),
        vx: randomInt(10, 15),
        vy: randomInt(-15, -10),
        show: false,
        url,
        id,
      });

      setTimeout(() => emotes[emotes.findIndex(emote => emote.id == id)].show = true, 100);
      setTimeout(() => emotes[emotes.findIndex(emote => emote.id == id)].show = false, 10000);

      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => emotes = [], 20000);
    }
  }
</script>

<ul>
  {#each emotes as emote}
    <li style="left:{emote.cx}px;top:{emote.cy}px">
      <div style="background-image:url({emote.url})" class:show={emote.show}></div>
    </li>
  {/each}
</ul>

<style type="text/sass">
  ul
    position: relative
    height: 900px
    width: 1440px
    margin: 1rem
    border: 1px solid red

    li
      position: absolute
      height: 4rem
      width: 4rem

      div
        height: 100%
        width: 100%
        background-position: center
        background-repeat: no-repeat
        background-size: contain
        transition: all .5s ease
        
        &:not(.show)
          opacity: 0
</style>