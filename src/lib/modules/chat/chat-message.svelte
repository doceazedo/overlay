<script lang="ts">
  import { onMount } from 'svelte';
  import { ChatMessage } from '$lib/components';
  import { chatEl } from '.';
  import type { ChatTheme } from '$lib/modules';
  import type { Message } from '.';

  export let message: Message, theme: ChatTheme;

  onMount(() => {
    console.log('msg nova!');
    $chatEl?.scrollTo(0, $chatEl.scrollHeight);
  });
</script>

<ChatMessage message={message.content} author={message.author} {theme} />
