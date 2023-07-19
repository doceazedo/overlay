import { trpc } from "trpc-client";
import type { Reward } from ".";
import type { Track } from "spotify-api.js";

type SongQueueEntry = {
  userId: string;
  track: Track;
};

const channelName = `${process.env.TWITCH_CHANNEL_NAME}`;

export const virtualQueue: SongQueueEntry[] = [];

export const songRequestHandler: Reward["handler"] = async (e, chat) => {
  const track = await trpc.spotifyApi.findFirstTrack.query({
    query: e.input,
  });
  if (!track)
    return chat.say(
      channelName,
      `@${e.userDisplayName}, não achei essa música no Spotify :/ Tem certeza de que o título, ID ou URL estão corretos?`
    );

  virtualQueue.push({ userId: e.userId, track: track as Track });

  setTimeout(() => {
    const isSongQueued = virtualQueue.find(
      (x) => x.userId === e.userId && x.track.id === track.id
    );
    if (!isSongQueued) return;

    trpc.spotifyApi.queueTrack.query({ uri: track.uri });
    virtualQueue.splice(virtualQueue.indexOf(isSongQueued), 1);
  }, 10000);

  chat.say(
    channelName,
    `@${e.userDisplayName} enfileirou ${track.artists[0].name} - ${track.name} 🕺🪩 Use !remover para remover da fila :)`
  );
};
