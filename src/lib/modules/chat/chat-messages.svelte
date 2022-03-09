<script lang="ts">
  import { ChatMessage } from '$lib/components';
  import { chatMessageListener } from '$lib/modules';
  import { CHANNEL_ID } from '$lib/env';
  import { parseEmotes } from 'emotettv';
  import type { ChatTheme, MessageAuthor, Message } from '.';

  export let theme: ChatTheme = 'dark';

  let messages: Message[] = [];
  // let users: UserResponse[] = [];

  const dummyUser = {
    pronouns: 'elu/delu',
    team: 'svelte',
    avatar:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/142da919-780b-4d38-adb3-436f425ac339-profile_image-300x300.png',
  };

  chatMessageListener.subscribe(async (message) => {
    if (!message) return;
    console.log(message); // TODO: delete this

    const content = await parseEmotes(
      message.message,
      message.tags.emotes,
      CHANNEL_ID,
    );

    const id = message.tags['user-id'];
    // if (!users[id]) users[id] = await getUser(id);

    const author: MessageAuthor = {
      ...dummyUser,
      id,
      username: message.tags.username,
      displayName: message.tags['display-name'],
      color: message.tags?.color,
      badges: [],
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
