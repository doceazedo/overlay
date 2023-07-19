import { createBotCommand } from "@twurple/easy-bot";
import { virtualQueue } from "../rewards/song-request";

const remover = createBotCommand("remover", (params, ctx) => {
  const queuedSongs = virtualQueue.filter((x) => x.userId === ctx.userId);
  const lastQueuedSong = queuedSongs[queuedSongs.length - 1];

  if (!lastQueuedSong) {
    ctx.reply(
      "Você não tem músicas na fila ou o tempo para removê-la já passou 😬"
    );
    return;
  }

  const track = lastQueuedSong.track;
  virtualQueue.splice(virtualQueue.indexOf(lastQueuedSong), 1);
  ctx.reply(
    `A música ${track.artists[0].name} - ${track.name} foi removida 👌`
  );
});

export default remover;
