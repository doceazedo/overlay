<script lang="ts">
  import { fly } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { Avatar, ChatBubble } from '$lib/components';
  import { chatEl } from '$lib/modules';
  import type { ChatTheme, MessageAuthor } from '$lib/modules';
  import { onMount } from 'svelte';

  export let messageThatIReallyReallyPromiseIHaveSanitized: string,
    author: MessageAuthor,
    theme: ChatTheme = 'dark';

  let contentEl: HTMLElement;

  const scrollToBottom = () => $chatEl?.scrollTo(0, $chatEl.scrollHeight);

  onMount(() => {
    if (!browser) return;
    [...contentEl.querySelectorAll('img')].map((img: HTMLImageElement) => {
      img.addEventListener('load', scrollToBottom)
    })

    scrollToBottom();
  })
</script>

<div class="message-wrapper theme-{theme}" transition:fly={{ x: -16, duration: 500 }}>
  <div class="avatar-wrapper">
    <Avatar src={author.avatar} />
  </div>
  <div class="message">
    <div class="info">
      <span class="name" style="color: {author?.color}">
        {author.displayName}
      </span>
      <span class="pronouns" class:hide={!author?.pronouns}>
        ({author?.pronouns})
      </span>
      <span
        class="badges"
        style="fill: #{author?.team?.hex}"
        class:hide={!author?.team}
      >
        {@html author?.team?.svg}
      </span>
      {#if author.badges.length}
        <span class="badges" class:hide={!author.badges.length}>
          {#each author.badges as badge}
            <img src={badge} alt="" />
          {/each}
        </span>
      {/if}
    </div>
    <div bind:this={contentEl} class="content">
      {@html messageThatIReallyReallyPromiseIHaveSanitized}
    </div>
    <ChatBubble {theme} />
  </div>
</div>

<style lang="sass">
  @import './themes'

  .message-wrapper
    position: relative
    display: flex
    gap: 1rem
    z-index: 1

    .avatar-wrapper
      display: flex
      align-items: flex-end

    .message
      position: relative
      display: flex
      flex-direction: column
      padding: .5rem
      border-radius: .5rem
      border-bottom-left-radius: 0

      .info
        display: flex
        align-items: center
        gap: .5rem

        .name
          color: #ffd479

        .pronouns
          font-style: italic
          color: rgba(#fff, .75)
          font-size: .9rem

        .badges
          display: inline-flex
          gap: .35rem
          padding: .35rem
          border-radius: .5rem

          :global(svg),
          img
            height: 1.125rem

        .hide
          display: none

      .content
        color: #fff
        line-height: 1.5
        word-break: break-word

        :global(.emote)
          transform: translateY(.5rem)

        :global(.emote + .emote)
          margin-left: .25rem

        :global(img:not(.emote))
          border-radius: .25rem

        :global(a)
          color: inherit
          text-decoration: none

    &.theme-dark .message
      background-color: $dark-message

      .badges
          background-color: $dark-background

    &.theme-light .message
      background-color: $light-message

      .badges
          background-color: $light-message
</style>
