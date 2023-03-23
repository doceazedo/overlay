<script lang="ts">
  import { fly } from 'svelte/transition';
  import { elasticOut, elasticIn } from 'svelte/easing';
  import { CHANNEL_ID } from '$lib/env';
  import { socket } from '$lib/modules';
  import { chatMessageListener } from '$lib/modules/chat';
  import type { Word } from '$lib/modules/chat';

  const transition = { duration: 1200, y: -85 };

  let show = false;
  let words: Word[] = [];

  socket.on('cmd:marquee', () => {
    if (show && words.length) return;
    show = true;
    setTimeout(() => show = false, 30000);
  });

  chatMessageListener.subscribe((message) => {
    if (message == null) return;
    if (!message.tags.mod && message.tags['user-id'] != CHANNEL_ID) return;
    if (!['!marquee', '!marquinhos', '!meta', '!projeto'].includes(message.words[0].text)) return;
    if (message.words.length < 2) return;

    message.words.shift();
    words = message.words;
  });
</script>

{#if show && words.length}
  <div
    class="marquee-wrapper"
    in:fly={{ ...transition, easing: elasticOut }}
    out:fly={{ ...transition, easing: elasticIn }}
  >
    <div class="marquee" class:fix-height={words.filter(word => word.emote).length}>
      <!-- svelte-ignore a11y-distracting-elements -->
      <marquee scrollamount={8}>
        {#each words as word}
          {#if word.emote}
            <img
              src={word.emote.url[1]}
              alt={word.text}
              class="emote"
            />
          {:else}
            {` ${word.text} `}
          {/if}
        {/each}
      </marquee>
    </div>
  </div>
{/if}

<style lang="sass">
  .marquee-wrapper
    position: absolute
    top: 0
    left: 0
    display: flex
    width: 1412px
    padding: 14px

  .marquee
    display: flex
    width: 100%
    padding: 1rem
    background-color: #6930c3
    border-radius: .75rem
    font-size: 1.25rem

    &.fix-height marquee
      transform: translateY(-.25rem)

  .emote
    height: 2rem
    transform: translateY(.25rem)

    + .emote
      margin-left: .25rem
</style>
