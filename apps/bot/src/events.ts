import { Bot } from "@twurple/easy-bot";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { socket } from "ws-client";

const broadcasterId = `${process.env.PUBLIC_TWITCH_BROADCASTER_ID}`;
const channelName = `${process.env.TWITCH_CHANNEL_NAME}`;

export const initEventHandler = (chat: Bot, eventSub: EventSubWsListener) => {
  chat.onMessage((e) => {
    socket.emit("message", {
      userDisplayName: e.userDisplayName,
      userId: e.userId,
      text: e.text,
      emoteOffsets: e.emoteOffsets,
    });
  });

  eventSub.onChannelFollow(broadcasterId, broadcasterId, (e) => {
    socket.emit("event", {
      type: "follow",
      userDisplayName: e.userDisplayName,
    });
    chat.say(channelName, `Valeu por me seguir, @${e.userDisplayName}!`);
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

  const giftCounts = new Map<string | undefined, number>();

  chat.chat.onCommunitySub((channel, user, subInfo) => {
    const previousGiftCount = giftCounts.get(user) || 0;
    giftCounts.set(user, previousGiftCount + subInfo.count);
    socket.emit("event", {
      type: "communitysub",
      gifterDisplayName: user,
      count: subInfo.count,
    });
    chat.say(
      channel,
      `Valeu por presentear ${subInfo.count} inscrições para comunidade, @${user}!`
    );
  });

  chat.chat.onSubGift((channel, recipient, subInfo) => {
    const user = subInfo.gifter;
    const previousGiftCount = giftCounts.get(user) || 0;
    if (previousGiftCount > 0) {
      giftCounts.set(user, previousGiftCount - 1);
    } else {
      socket.emit("event", {
        type: "giftsub",
        gifterDisplayName: user,
        recipientDisplayName: recipient,
      });
      chat.say(
        channel,
        `Valeu por presentear @${recipient} com uma inscrição, @${user}!`
      );
    }
  });

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
