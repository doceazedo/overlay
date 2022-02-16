<script lang="ts">
  import { Avatar } from '$lib/components';

  type MessageAuthor = {
    name: string;
    avatar: string;
    color?: string;
    pronouns?: string;
    team?: SVGElement;
    badges: string[];
  };

  export let message: string, author: MessageAuthor;
</script>

<div class="message-wrapper">
  <div class="avatar-wrapper">
    <Avatar src={author.avatar} />
  </div>
  <div class="message">
    <div class="info">
      <span class="name" style="color: {author?.color}">{author.name}</span>
      <span class="pronouns">{author?.pronouns}</span>
      <span class="badges" class:has-none={author?.team == null}>
        {author?.team}
      </span>
      <span class="badges" class:has-none={author?.badges == null}>
        {#each author.badges as badge}
          <img src={badge} alt="" />
        {/each}
      </span>
    </div>
    <div class="content">{@html message}</div>
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

      &::before
        content: ''
        position: absolute
        left: -.7rem
        bottom: 0
        height: 1rem
        width: .75rem
        background-image: url('/assets/img/chat-bubble.svg')
        background-position: center right
        background-repeat: no-repeat
        background-size: contain

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
</style>
