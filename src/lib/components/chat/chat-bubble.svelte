<script lang="ts">
  import type { ChatTheme } from '$lib/modules';

  export let theme: ChatTheme = 'dark';
</script>

<svg
  class="theme-{theme}"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 11.76 16"
>
  <path d="M11.76,0,.88,10.88A3,3,0,0,0,3,16h8.75Z" />
</svg>

<style lang="sass">
  @import './themes'

  svg
    position: absolute
    left: -.7rem
    bottom: 0
    height: 1rem
    width: .75rem

    &.theme-dark
      fill: $dark-message

    &.theme-light
      fill: $light-message
</style>
