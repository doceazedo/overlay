<script lang="ts">
  import { Chat } from '$lib/components';
  import { ChatMessages } from '$lib/modules';
  import { chatEl } from '.';
  import type { ChatTheme } from '.';

  export let theme: ChatTheme = 'dark';
</script>

<Chat {theme} bind:chatEl={$chatEl}>
  <ChatMessages {theme} />
</Chat>
