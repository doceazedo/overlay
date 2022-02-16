<script lang="ts">
  export let title: string, artist: string, difficulty = '', image: string;
</script>

<div class="music-player">
  <figure class="cover" style="background-image: url({image})" />
  <div class="info">
    <h1>{title}</h1>
    <h2>{artist} <span>{difficulty}</span></h2>
  </div>
</div>

<style lang="sass">
  .music-player
    display: flex
    width: 100%
    height: 5rem
    gap: .75rem
    background-color: #242424
    border-radius: .5rem
    padding: .75rem

    .cover
      height: 3.5rem
      width: 3.5rem
      border-radius: .5rem
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      transition: all .2s ease

    .info
      display: flex
      flex-direction: column
      justify-content: center

      h1,
      h2
        max-width: 22rem
        line-height: 1.25
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        transition: all .2s ease

      h1
        font-size: 1.5rem
        font-weight: 700

      h2 span
        opacity: .5
</style>