<script lang="ts">
  import { Chat } from '$lib/components';
  import { ChatMessages } from '$lib/modules';
  import { chatEl } from '.';
  import type { ChatTheme } from '.';

  export let theme: ChatTheme = 'dark';
  export let ttl = 0;
</script>

<Chat {theme} bind:chatEl={$chatEl}>
  <ChatMessages {theme} {ttl} />
</Chat>
