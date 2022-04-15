<script lang="ts">
  import type { Emote } from '$lib/modules/emote-wall';

  export let width: number, height: number, emotes: Emote[];
</script>

<ul style="width:{width}px; height:{height}px">
  {#each emotes as emote}
    <li style="left:{emote.cx}px; top:{emote.cy}px">
      <div style="background-image:url({emote.url})" class:show={emote.show} />
    </li>
  {/each}
</ul>

<style lang="sass">
  ul
    position: relative
    pointer-events: none

    li
      position: absolute
      height: 4rem
      width: 4rem

      div
        height: 100%
        width: 100%
        background-position: center
        background-repeat: no-repeat
        background-size: contain
        transition: all .5s ease

        &:not(.show)
          opacity: 0
</style>
