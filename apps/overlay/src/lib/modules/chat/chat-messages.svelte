<script lang="ts">
  import { createId } from '@paralleldrive/cuid2';
  import { getUser } from '$lib/clients/users';
  import { ChatMessage, chatMessageListener, getBadges, getTeam } from '.';
  import type { ChatTheme, MessageAuthor, Message } from '.';

  export let theme: ChatTheme = 'dark';
  export let ttl = 0;

  let messages: Message[] = [];

  chatMessageListener.subscribe(async (message) => {
    if (!message) return;

    const id = message.tags['user-id'] || 'unknown';
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

    const messageId = createId();
    messages.push({
      id: messageId,
      content: message.words,
      author,
    });
    messages = messages;

    if (ttl) setTimeout(() => {
      messages = messages.filter(message => message.id != messageId);
    }, ttl);
  });
</script>

{#each messages as message (message.id)}
  <ChatMessage {message} {theme} />
{/each}
