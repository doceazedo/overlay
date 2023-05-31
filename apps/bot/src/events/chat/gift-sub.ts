import type { ChatClient } from '@twurple/chat';

const giftCounts = new Map<string | undefined, number>();

export const giftSubEvent = (chatClient: ChatClient, userId: string) => {
  chatClient.onCommunitySub((channel, user, info) => {
    const previousGiftCount = giftCounts.get(user) || 0;
    giftCounts.set(user, previousGiftCount + info.count);
    chatClient.say(
      channel,
      `Obrigado por presentear ${info.count} subs para comunidade, @${user}! 🎁✨`
    );
  });

  chatClient.onSubGift((channel, recipient, info) => {
    const user = info.gifter;
    const previousGiftCount = giftCounts.get(user) ?? 0;
    if (previousGiftCount > 0) {
      giftCounts.set(user, previousGiftCount - 1);
    } else {
      chatClient.say(
        channel,
        `Obrigado, @${user}, por presentar @${recipient} com um sub! 🎁✨`
      );
    }
  });
};
