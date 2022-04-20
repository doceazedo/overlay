<script lang="ts">
  import { getUser } from '$lib/clients/users';
  import { ChatMessage, chatMessageListener, getBadges, getTeam } from '.';
  import type { ChatTheme, MessageAuthor, Message } from '.';

  export let theme: ChatTheme = 'dark';

  let messages: Message[] = [];

  chatMessageListener.subscribe(async (message) => {
    if (!message) return;

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
      content: message.words,
      author,
    });
    messages = messages;
  });
</script>

{#each messages as message}
  <ChatMessage {message} {theme} />
{/each}
