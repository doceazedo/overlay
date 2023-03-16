<script>
  import { Alerts, Chat, EmoteWall, MusicPlayer, Shoutout } from '$lib/modules';
</script>

<div class="camera" />
<div class="music-player">
  <MusicPlayer />
</div>
<Shoutout />
<EmoteWall wallWidth={1920} wallHeight={1080} />
<div class="chat">
  <Chat theme="light" ttl={60000} />
</div>
<Alerts position="right" />

<style lang="sass">
  .camera
    position: absolute
    top: 4rem
    left: 1rem
    width: 480px
    height: 270px

    &::before
      content: ''
      position: absolute
      left: -40px
      top: 24px
      width: 100%
      height: 100%
      border: 4px solid #6930c3
      border-radius: 24px
      z-index: 5

  .music-player
    position: absolute
    top: 24.5rem
    left: 1rem
    width: 480px
    background-color: #4b1c94
    border-radius: 1.5rem

    :global(.now-playing:not(.details) .background)
      opacity: .25 !important

  .chat
    position: absolute
    top: 33rem
    left: 1rem
    width: 480px
    height: 33.5rem

    :global(.chat-wrapper)
      padding: 0
      border-radius: 0
      background-color: transparent !important
      backdrop-filter: none !important

    :global(.message)
      border-radius: .75rem !important
      border-bottom-left-radius: 0 !important
      background-color: rgba(#000, .8) !important

    :global(.message > svg)
      fill: rgba(#000, .8)
</style>
