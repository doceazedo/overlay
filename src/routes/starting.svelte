<script lang="ts">
  import { MediaPlayer } from '$lib/modules';
</script>

<main>
  <MediaPlayer />
</main>

<style lang="sass">
  :global(body)
    background-color: #070212

  main
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 1rem
    width: 100%
    height: 100%
</style>
