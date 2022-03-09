<script lang="ts">
  import { Chat } from '$lib/components';
  import { ChatMessages } from '$lib/modules';
  import type { ChatTheme } from '.';

  export let theme: ChatTheme = 'dark';
</script>

<Chat {theme}>
  <ChatMessages {theme} />
</Chat>
