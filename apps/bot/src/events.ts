import { Bot } from "@twurple/easy-bot";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { socket } from "ws-client";

const broadcasterId = `${process.env.PUBLIC_TWITCH_BROADCASTER_ID}`;

export const initEventHandler = (chat: Bot, eventSub: EventSubWsListener) => {
  chat.onMessage((e) => {
    socket.emit("message", {
      broadcasterId: e.broadcasterId,
      broadcasterName: e.broadcasterName,
      emoteOffsets: e.emoteOffsets,
      isAction: e.isAction,
      text: e.text,
      userDisplayName: e.userDisplayName,
      userId: e.userId,
      userName: e.userName,
    });
  });

  eventSub.onChannelFollow(broadcasterId, broadcasterId, (e) => {
    socket.emit("message", {
      broadcasterDisplayName: e.broadcasterDisplayName,
      broadcasterId: e.broadcasterId,
      broadcasterName: e.broadcasterName,
      followDate: e.followDate,
      userDisplayName: e.userDisplayName,
      userId: e.userId,
      userName: e.userName,
    });
  });

  chat.onSub(({ broadcasterName, userName }) => {
    chat.say(
      broadcasterName,
      `Thanks to @${userName} for subscribing to the channel!`
    );
  });

  chat.onResub(({ broadcasterName, userName, months }) => {
    chat.say(
      broadcasterName,
      `Thanks to @${userName} for subscribing to the channel for a total of ${months} months!`
    );
  });

  chat.onSubGift(({ broadcasterName, gifterName, userName }) => {
    chat.say(
      broadcasterName,
      `Thanks to @${gifterName} for gifting a subscription to @${userName}!`
    );
  });
};
