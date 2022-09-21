<script lang="ts">
  import { OSU_STREAM_COMPANION_URL } from '$lib/env';

  const src = `${OSU_STREAM_COMPANION_URL}/overlays/SC_Live%20Overlay/`;
</script>

<div class="osu-sc-live">
  <iframe {src} title="Stream Companion" frameborder="0" />
</div>

<style lang="sass">
  .osu-sc-live
    position: absolute
    bottom: 2.25rem
    left: 2.25rem
    width: 860px
    height: 205px
    border-radius: 1.5rem
    overflow: hidden

    iframe
      width: 100%
      height: 100%
</style>
