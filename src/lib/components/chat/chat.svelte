<script lang="ts">
  import type { ChatTheme } from '$lib/modules';

  export let chatEl: HTMLDivElement,
    theme: ChatTheme = 'dark';
</script>

<div class="chat-wrapper theme-{theme}">
  <div class="chat" bind:this={chatEl}>
    <slot />
  </div>
</div>

<style lang="sass">
  @import './themes'

  .chat-wrapper
    flex-grow: 1
    padding: .75rem
    border-radius: 24px
    overflow: hidden

    .chat
      display: flex
      flex-direction: column
      gap: .75rem
      height: 100%
      overflow: hidden

    &.theme-dark
      background-color: $dark-background

    &.theme-light
      background-color: $light-background
      backdrop-filter: blur(.5rem)
</style>
