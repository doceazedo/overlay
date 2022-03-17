<script lang="ts">
  export let canvas;
</script>

<canvas bind:this={canvas} />

<style lang="sass">
  canvas
    position: absolute
    top: 0
    left: 0
    z-index: 10
    height: 1080px
    width: 1440px
    pointer-events: none
</style>
