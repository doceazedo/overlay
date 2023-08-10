import { createBotCommand } from "../commands";
import { virtualQueue } from "../rewards/song-request";

const remover = createBotCommand(
  ["wrongsong", "cancel", "cancelar", "errei", "ws", "remove", "remover"],
  (ctx) => {
    const queuedSongs = virtualQueue.filter(
      (x) => x.userId === ctx.msg.userInfo.userId
    );
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
  }
);

export default remover;
