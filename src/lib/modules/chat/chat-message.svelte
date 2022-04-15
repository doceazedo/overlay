<script lang="ts">
  import { onMount } from 'svelte';
  import { ChatMessage } from '$lib/components';
  import { chatEl } from '.';
  import type { ChatTheme } from '$lib/modules';
  import type { Message } from '.';

  export let message: Message, theme: ChatTheme;

  const scrollToBottom = () => $chatEl?.scrollTo(0, $chatEl.scrollHeight);

  onMount(scrollToBottom);
</script>

<ChatMessage
  message={message.content}
  author={message.author}
  {theme}
  {scrollToBottom}
/>
