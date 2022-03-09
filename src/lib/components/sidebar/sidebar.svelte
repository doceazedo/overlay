<script lang="ts">
  export let showHandcam = false;
</script>

<div class:handcam={showHandcam}>
  <slot />
</div>

<style lang="sass">
  div
    position: absolute
    bottom: 0
    right: 0
    display: flex
    flex-direction: column
    gap: 1rem
    width: 480px
    height: 810px
    padding: 1rem
    background-color: #2d2d2d

    &.handcam
      height: 540px
</style>
