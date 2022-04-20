<aside class="sidebar">
  <div class="sidebar-inner">
    <div class="camera">
      <div class="camera-placeholder" />
    </div>
    <slot />
  </div>
</aside>

<style lang="sass">
  .sidebar
    position: fixed
    top: 0
    right: 0
    flex-shrink: 0
    height: 100%
    padding: 14px
    background-color: #070212
    border-top-left-radius: 24px
    border-bottom-left-radius: 24px

    &-inner
      display: flex
      flex-direction: column
      gap: 14px
      height: 100%
      width: 480px

    .camera
      position: relative
      flex-shrink: 0
      width: 100%
      margin-bottom: 24px
      aspect-ratio: 16/9
      border-radius: 24px

      &-placeholder
        position: relative
        width: 100%
        height: 100%
        background-color: rgba(#fff, .1)
        border-radius: 24px
        z-index: 10

      &::before
        content: ''
        position: absolute
        left: 40px
        top: 24px
        width: 100%
        height: 100%
        border: 2px solid #6930c3
        border-radius: 24px
        z-index: 5
</style>
