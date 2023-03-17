<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { EmoteWall } from '$lib/components/emote-wall';
  import { chatMessageListener } from '$lib/modules/chat';
  import { socket } from '$lib/modules';
  import { randomInRange } from '$lib/utils';
  import type { Emote } from './emote-wall.types';

  export let wallWidth = 1412,
    wallHeight = 1080;

  const fps = 60;
  const size = 64;
  const gravity = 0.1;
  const damping = 0.9;
  const traction = 0.8;

  let emotes: Emote[] = [];
  let idleTimeout = setTimeout(() => (emotes = []), 11000);

  const getEmote = (id: string) =>
    emotes[emotes.findIndex((emote) => emote.id == id)];

  const updateEmotesPos = () => {
    emotes.forEach((pos, i) => {
      if (pos.cx + size >= wallWidth) {
        emotes[i].vx = -pos.vx * damping;
        emotes[i].cx = wallWidth - size;
      } else if (pos.cx <= 0) {
        emotes[i].vx = -pos.vx * damping;
        emotes[i].cx = 0;
      }

      if (pos.cy + size >= wallHeight) {
        emotes[i].vy = -pos.vy * damping;
        emotes[i].cy = wallHeight - size;
        emotes[i].vx *= traction;
      } else if (pos.cy <= 0) {
        emotes[i].vy = -pos.vy * damping;
        emotes[i].cy = 0;
      }

      emotes[i].vy += gravity;
      emotes[i].cx += pos.vx;
      emotes[i].cy += pos.vy;
    });

    emotes = emotes;
  };
  setInterval(updateEmotesPos, 1000 / fps);

  const pushEmote = (url: string) => {
    const id = uuidv4();
    emotes.push({
      cx: randomInRange(0, wallWidth),
      cy: randomInRange(820, wallHeight),
      vx: randomInRange(10, 15),
      vy: randomInRange(-15, -10),
      show: false,
      url,
      id,
    });

    setTimeout(() => (getEmote(id).show = true), 100);
    setTimeout(() => (getEmote(id).show = false), 10000);

    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => (emotes = []), 20000);
  };

  chatMessageListener.subscribe((message) => {
    if (message == null) return;

    const words = message.parsedMessage.toWords();
    words.forEach((word) => word?.emote && pushEmote(word.emote.url[2]));
  });

  socket.on('cmd:alan', async () => {
    const alan = Array(8).fill('/assets/img/alan-uwu.png');
    const pray = Array(4).fill('/assets/img/pray.png');
    const lgbtFlag = Array(4).fill('/assets/img/lgbt-flag.png');
    const emotes = [...alan, ...pray, ...lgbtFlag];
    emotes.forEach((emote) => pushEmote(emote));
  });
</script>

<EmoteWall width={wallWidth} height={wallHeight} {emotes} />
