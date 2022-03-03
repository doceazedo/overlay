<script>
  export let emotes = [];

  const wallWidth = 1440;
  const wallHeight = 1080;

  let size = 64,
    gravity = 0.1,
    damping = 0.9,
    traction = 0.8,
    visibleEmotes = [],
    idleTimeout = setTimeout(() => (visibleEmotes = []), 11000);

  const renderEmote = () => {
    visibleEmotes.forEach((pos, i) => {
      if (pos.cx + size >= wallWidth) {
        visibleEmotes[i].vx = -pos.vx * damping;
        visibleEmotes[i].cx = wallWidth - size;
      } else if (pos.cx <= 0) {
        visibleEmotes[i].vx = -pos.vx * damping;
        visibleEmotes[i].cx = 0;
      }
      if (pos.cy + size >= wallHeight) {
        visibleEmotes[i].vy = -pos.vy * damping;
        visibleEmotes[i].cy = wallHeight - size;
        visibleEmotes[i].vx *= traction;
      } else if (pos.cy <= 0) {
        visibleEmotes[i].vy = -pos.vy * damping;
        visibleEmotes[i].cy = 0;
      }

      visibleEmotes[i].vy += gravity;
      visibleEmotes[i].cx += pos.vx;
      visibleEmotes[i].cy += pos.vy;
    });

    visibleEmotes = visibleEmotes;
  };
  setInterval(renderEmote, 1000 / 75);

  const randomInt = (min, max) => Math.random() * (max - min) + min;
  const randomHash = () => (Math.random() + 1).toString(36).substring(7);

  const pushEmote = (url) => {
    const id = randomHash();
    visibleEmotes.push({
      cx: randomInt(0, 1440),
      cy: randomInt(820, 1080),
      vx: randomInt(10, 15),
      vy: randomInt(-15, -10),
      show: false,
      url,
      id,
    });

    setTimeout(
      () =>
        (visibleEmotes[
          visibleEmotes.findIndex((emote) => emote.id == id)
        ].show = true),
      100,
    );
    setTimeout(
      () =>
        (visibleEmotes[
          visibleEmotes.findIndex((emote) => emote.id == id)
        ].show = false),
      10000,
    );

    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => (visibleEmotes = []), 20000);
  };

  emotesStore.subscribe((emotesArr) => {
    emotesArr.forEach((emoteURL) => pushEmote(emoteURL));
  });
</script>

<ul style="width:{wallWidth}px; height:{wallHeight}px">
  {#each visibleEmotes as emote}
    <li style="left:{emote.cx}px;top:{emote.cy}px">
      <div style="background-image:url({emote.url})" class:show={emote.show} />
    </li>
  {/each}
</ul>

<style type="text/sass">
  ul
    position: relative

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
