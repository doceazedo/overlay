<script lang="ts">
  import type { CurrentlyPlayingDetailsResponse } from '$lib/services/song';

  const fallbackTitle = 'Nada tocando 😭';
  const fallbackArtist = '';

  export let song: CurrentlyPlayingDetailsResponse = null,
    showDetails = false;
</script>

<div class="now-playing" class:details={showDetails}>
  <div class="content">
    <figure class="cover-sm">
      <img src={song?.song?.cover} alt="" />
    </figure>
    <div class="info" class:paused={!song}>
      <h1>{song?.song?.title || fallbackTitle}</h1>
      <h2>{song?.artist?.name || fallbackArtist}</h2>
    </div>
  </div>
  <div class="background">
    <img class="cover-xl" src={song?.song?.cover} alt="" />
    <figure
      class="artist"
      style="background-image: url({song?.artist?.image})"
    />
  </div>
</div>

<style lang="sass">
  .now-playing
    position: relative
    flex-shrink: 0
    width: 100%
    height: 100px
    border-radius: 24px
    background-color: rgba(#fff, 0.05)
    transition: all .8s ease

    .content,
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%

    .content
      z-index: 10
      display: flex
      gap: 12px
      padding: 12px

      .cover-sm
        flex-shrink: 0
        height: 76px
        max-width: 76px
        transition: all .8s ease

        img
          border-radius: 16px

    .background
      z-index: 5
      display: flex
      align-items: center
      border-radius: 24px
      opacity: .1
      overflow: hidden
      transition: all .3s ease

      .cover-xl
        width: 480px
        height: 480px
        filter: blur(16px)
        transition: all .3s ease

      .artist
        width: 240px
        height: 240px
        background-position: center
        background-repeat: no-repeat
        background-size: cover
        transition: all .5s ease

    .info
      display: flex
      flex-direction: column
      gap: 4px
      margin-top: 8px
      transition: all .8s ease

      &.paused
        width: 100%
        justify-content: center
        align-items: center

      h1,
      h2
        flex-shrink: 0
        width: fit-content
        max-width: 368px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        transition: all .3s ease

      h1
        font-size: 1.75rem
        font-weight: 700

      h2
        font-size: 1.25rem
        font-weight: 300

    &.details
      height: 240px

      .cover-xl
        width: 240px
        height: 240px

      .content
        figure
          width: 0 !important
          opacity: 0

        .info
          margin-top: calc(100% - 277px)
          margin-left: -16px

          h1,
          h2
            max-width: 444px
            background-color: rgba(0, 0, 0, .5)
            padding: 0 .25rem

          h1
            font-size: 1rem

          h2
            font-size: .75rem

      .background
        opacity: 1

        img
          filter: blur(0)
</style>
