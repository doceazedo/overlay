<script>
  import { EmoteWall, MusicPlayer, Shoutout } from '$lib/modules';
</script>

<div class="camera" />
<div class="music-player">
  <MusicPlayer />
</div>
<Shoutout />
<EmoteWall wallWidth={1920} wallHeight={1080} />

<style lang="sass">
  .camera
    position: absolute
    top: 10rem
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
    top: 29.5rem
    left: 1rem
    width: 480px
    background-color: #4b1c94
    border-radius: 1.5rem

    :global(.now-playing:not(.details) .background)
      opacity: .75 !important
</style>
