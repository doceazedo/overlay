<script lang="ts">
  import type { CurrentlyPlayingDetailsResponse } from '$lib/services/song';

  export let title = 'Nada tocando :(',
    artist = '',
    cover: string,
    details: CurrentlyPlayingDetailsResponse,
    showArtist = false;
</script>

<div class="now-playing" class:details={details != null}>
  <div class="content">
    <figure class="cover-sm">
      <img src={cover} alt="" />
    </figure>
    <div class="info">
      <h1>{title}</h1>
      <h2>{artist}</h2>
    </div>
  </div>
  <div class="background">
    <img class="cover-xl" src={cover} alt="" />
    <figure
      class="artist"
      class:show={showArtist}
      style="background-image: url({details?.artist?.image})"
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
        height: 76px
        width: 76px
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
        position: absolute
        top: 0
        left: 480px
        width: 480px
        height: 480px
        background-position: center
        background-repeat: no-repeat
        background-size: cover
        transition: all .5s ease

        &.show
          left: 0

    .info
      display: flex
      flex-direction: column
      gap: 4px
      margin-top: 8px
      transition: all .8s ease

      h1,
      h2
        width: fit-content
        transition: all .3s ease

      h1
        font-size: 1.75rem
        font-weight: 700

      h2
        font-size: 1.25rem
        font-weight: 300

    &.details
      height: 480px

      .content
        figure
          width: 0 !important
          opacity: 0

        .info
          margin-top: calc(100% - 72px)

          h1,
          h2
            background-color: rgba(0, 0, 0, .5)
            padding: 0 .5rem

      .background
        opacity: 1

        img
          filter: blur(0)
</style>
