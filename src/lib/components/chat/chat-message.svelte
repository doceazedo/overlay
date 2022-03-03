<script lang="ts">
  import { Avatar, ChatBubble } from '$lib/components';
  import type { MessageAuthor } from '$lib/modules';
  import type { Word } from 'emotettv';

  export let message: Word[], author: MessageAuthor;
</script>

<div class="message-wrapper">
  <div class="avatar-wrapper">
    <Avatar src={author.avatar} />
  </div>
  <div class="message">
    <div class="info">
      <span class="name" style="color: {author?.color}">
        {author.displayName}
      </span>
      <span class="pronouns">{author?.pronouns}</span>
      <span class="badges" class:has-none={author?.team == null}>
        {author?.team}
      </span>
      <span class="badges" class:has-none={!author.badges.length}>
        {#each author.badges as badge}
          <img src={badge} alt="" />
        {/each}
      </span>
    </div>
    <div class="content">
      {#each message as word}
        {#if word.emote}
          <img src={word.emote.url[0]} alt={word.text} class="emote" />
        {:else}
          {` ${word.text} `}
        {/if}
      {/each}
    </div>
    <ChatBubble />
  </div>
</div>

<style lang="sass">
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
      background-color: #191919

      .info
        display: flex
        align-items: center
        gap: .5rem

        .name
          color: #ffd479

        .pronouns
          font-style: italic
          color: rgba(#fff, .75)
          font-size: .75rem

        .badges
          display: inline-flex
          gap: .35rem
          padding: .35rem
          border-radius: .5rem
          background-color: #242424

          &.has-none
            display: none

      .content
        color: #fff
        line-height: 1.5
        word-break: break-word

        .emote
          transform: translateY(.5rem)

          + .emote
            margin-left: .25rem
</style>
