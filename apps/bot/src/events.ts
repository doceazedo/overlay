import { Bot } from "@twurple/easy-bot";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { socket } from "ws-client";

const broadcasterId = `${process.env.PUBLIC_TWITCH_BROADCASTER_ID}`;

export const initEventHandler = (chat: Bot, eventSub: EventSubWsListener) => {
  chat.onMessage((e) => {
    socket.emit("event", {
      type: "message",
      userDisplayName: e.userDisplayName,
      text: e.text,
      emoteOffsets: e.emoteOffsets,
    });
  });

  eventSub.onChannelFollow(broadcasterId, broadcasterId, (e) => {
    socket.emit("event", {
      type: "follow",
      userDisplayName: e.userDisplayName,
    });
    chat.say(broadcasterId, `Valeu por me seguir, @${e.userDisplayName}!`);
  });

  chat.onSub((e) => {
    socket.emit("event", {
      type: "sub",
      userDisplayName: e.userDisplayName,
      isPrime: e.isPrime,
    });
    chat.say(
      e.broadcasterName,
      `Valeu ${e.isPrime ? "pelo Prime" : "por se inscrever"}, @${
        e.userDisplayName
      }!`
    );
  });

  chat.onResub((e) => {
    socket.emit("event", {
      type: "resub",
      userDisplayName: e.userDisplayName,
      months: e.months,
      isPrime: e.isPrime,
    });
    chat.say(
      e.broadcasterName,
      `Valeu ${e.isPrime ? "pelo Prime de" : "por se inscrever por"} ${
        e.months
      } meses, @${e.userDisplayName}!`
    );
  });

  // TODO: sub gift + prevent spam

  chat.onRaid((e) => {
    socket.emit("event", {
      type: "raid",
      userDisplayName: e.userDisplayName,
      raiders: e.viewerCount,
    });
    chat.say(
      e.broadcasterName,
      `@${e.userDisplayName} está raidando com ${e.viewerCount} pessoas!`
    );
  });

  // TODO: queue song

  // TODO: redeems
};
