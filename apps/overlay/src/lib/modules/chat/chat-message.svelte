<script lang="ts">
  import { ChatMessage } from '$lib/components';
  import type { ChatTheme } from '$lib/modules';
  import type { Message } from '.';

  export let message: Message, theme: ChatTheme;
</script>

<ChatMessage
  messageThatIReallyReallyPromiseIHaveSanitized={message.content}
  author={message.author}
  {theme}
/>
