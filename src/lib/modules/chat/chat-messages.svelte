<script lang="ts">
  import { parseEmotes } from 'emotettv';
  import { ChatMessage } from '$lib/components';
  import { getUser } from '$lib/services/users';
  import { CHANNEL_ID } from '$lib/env';
  import { chatMessageListener, getBadges, getTeam } from '.';
  import type { ChatTheme, MessageAuthor, Message } from '.';

  export let theme: ChatTheme = 'dark';

  let messages: Message[] = [];

  chatMessageListener.subscribe(async (message) => {
    if (!message) return;

    const content = await parseEmotes(
      message.message,
      message.tags.emotes,
      CHANNEL_ID,
    );

    const id = message.tags['user-id'];
    const user = await getUser(id);
    const team = getTeam(user.team);
    const badges = await getBadges(message.tags.badges);

    const author: MessageAuthor = {
      id,
      team,
      pronouns: user?.pronouns,
      avatar: user?.avatar,
      username: message.tags.username,
      displayName: message.tags['display-name'],
      color: message.tags?.color,
      badges,
      self: message.self,
    };

    messages.push({
      content,
      author,
    });
    messages = messages;
  });
</script>

{#each messages as message}
  <ChatMessage message={message.content} author={message.author} {theme} />
{/each}
