<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Avatar, ChatBubble } from '$lib/components';
  import type { ChatTheme, MessageAuthor, Word } from '$lib/modules';

  export let message: Word[],
    author: MessageAuthor,
    theme: ChatTheme = 'dark',
    scrollToBottom: () => void;

  const emojiOnly =
    message.filter((word) => !!word.emote).length == message.length;
  const jumbomoji = emojiOnly && message.length <= 24;
  const singleEmoji = emojiOnly && message.length == 1;
  const emojiSize = singleEmoji ? 2 : jumbomoji ? 1 : 0;
</script>

<div class="message-wrapper theme-{theme}" in:fly={{ x: -16, duration: 500 }}>
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
      <span class="badges" class:hide={!author.badges.length}>
        {#each author.badges as badge}
          <img src={badge} alt="" />
        {/each}
      </span>
    </div>
    <div class="content">
      {#each message as word}
        {#if word.emote}
          <img
            src={word.emote.url[emojiSize]}
            alt={word.text}
            class="emote"
            on:load={scrollToBottom}
          />
        {:else}
          {` ${word.text} `}
        {/if}
      {/each}
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

          :global(svg)
            height: 1.125rem

        .hide
          display: none

      .content
        color: #fff
        line-height: 1.5
        word-break: break-word

        .emote
          transform: translateY(.5rem)

          + .emote
            margin-left: .25rem

    &.theme-dark .message
      background-color: $dark-message

      .badges
          background-color: $dark-background

    &.theme-light .message
      background-color: $light-message

      .badges
          background-color: $light-message
</style>
