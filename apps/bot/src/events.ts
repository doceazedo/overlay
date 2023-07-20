import { socket } from "ws-client";
import type { ChatClient } from "@twurple/chat";
import type { EventSubWsListener } from "@twurple/eventsub-ws";

const broadcasterId = `${process.env.PUBLIC_TWITCH_BROADCASTER_ID}`;
const channelName = `${process.env.TWITCH_CHANNEL_NAME}`;

export const initEventHandler = (
  chat: ChatClient,
  eventSub: EventSubWsListener
) => {
  chat.onMessage((channel, user, text, msg) => {
    socket.emit("message", {
      userDisplayName: user,
      userId: msg.userInfo.userId,
      text,
      emoteOffsets: msg.emoteOffsets,
    });
  });

  eventSub.onChannelFollow(broadcasterId, broadcasterId, (e) => {
    socket.emit("event", {
      type: "follow",
      userDisplayName: e.userDisplayName,
    });
    chat.say(channelName, `Valeu por me seguir, @${e.userDisplayName}!`);
  });

  chat.onSub((channel, user, subInfo, msg) => {
    socket.emit("event", {
      type: "sub",
      userDisplayName: user,
      isPrime: subInfo.isPrime,
    });
    chat.say(
      channel,
      `Valeu ${subInfo.isPrime ? "pelo Prime" : "por se inscrever"}, @${user}!`
    );
  });

  chat.onResub((channel, user, subInfo, msg) => {
    socket.emit("event", {
      type: "resub",
      userDisplayName: user,
      months: subInfo.months,
      isPrime: subInfo.isPrime,
    });
    chat.say(
      channel,
      `Valeu ${subInfo.isPrime ? "pelo Prime de" : "por se inscrever por"} ${
        subInfo.isPrime
      } meses, @${user}!`
    );
  });

  const giftCounts = new Map<string | undefined, number>();

  chat.onCommunitySub((channel, user, subInfo) => {
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

  chat.onSubGift((channel, recipient, subInfo) => {
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

  chat.onRaid((channel, user, raidInfo, msg) => {
    socket.emit("event", {
      type: "raid",
      userDisplayName: user,
      raiders: raidInfo.viewerCount,
    });
    chat.say(
      channel,
      `@${user} está raidando com ${raidInfo.viewerCount} pessoas!`
    );
  });

  // TODO: queue song

  // TODO: redeems
};
