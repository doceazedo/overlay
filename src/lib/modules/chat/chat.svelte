<script lang="ts">
  import { ChatMessage, Chat } from '$lib/components';

  const dummyMessage = {
    message: 'Eu sou uma mensagem de exemplo!',
    author: {
      name: 'doceazedo911',
      avatar: 'https://picsum.photos/200',
      pronouns: 'ele/dele',
      badges: [],
    }
  }
</script>

<Chat>
  {#each Array(3) as _}
    <ChatMessage
      message={dummyMessage.message}
      author={dummyMessage.author}
    />
  {/each}
</Chat>