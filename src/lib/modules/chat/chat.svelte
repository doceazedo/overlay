<script lang="ts">
  import { Chat } from '$lib/components';
  import { ChatMessages } from '$lib/modules';
  import { chatMessageListener } from '.';
  import type { ChatTheme } from '.';

  export let theme: ChatTheme = 'dark';

  let chatEl: HTMLDivElement;

  const scrollChat = () => {
    setTimeout(() => chatEl?.scrollTo(0, chatEl.scrollHeight), 50);
  };

  chatMessageListener.subscribe(() => scrollChat());
</script>

<Chat {theme} bind:chatEl>
  <ChatMessages {theme} />
</Chat>
