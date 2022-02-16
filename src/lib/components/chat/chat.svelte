<div class="chat-wrapper">
  <div class="chat">
    <slot />
  </div>
</div>

<style lang="sass">
  .chat-wrapper
    flex-grow: 1
    padding: .75rem
    background-color: #242424
    border-radius: .5rem
    overflow: hidden

    .chat
      display: flex
      flex-direction: column
      gap: .75rem
      height: 100%
      overflow: hidden
</style>
