<script lang="ts">
  export let showHandcam = false;
</script>

<div class="sidebar-wrapper">
  <div class="sidebar" class:handcam={showHandcam}>
    <slot />
  </div>
</div>

<style lang="sass">
  .sidebar-wrapper
    position: absolute
    top: 0
    right: 0
    display: flex
    flex-direction: column
    justify-content: flex-end
    width: 480px
    height: 100%

  .sidebar
    display: flex
    flex-direction: column
    gap: 1rem
    width: 100%
    height: calc(100% - 270px)
    padding: 1rem
    background-color: #2d2d2d

    &.handcam
      height: calc(100% - 540px)
</style>
