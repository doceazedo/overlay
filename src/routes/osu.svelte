<script lang="ts">
  import { BrandLogo, OsuCutout, OsuScLive } from '$lib/components';
  import { Chat } from '$lib/modules';
</script>

<OsuCutout />
<OsuScLive />
<div class="watermark">
  <BrandLogo width={220} height={80} />
</div>
<div class="chat-wrapper">
  <Chat theme="light" />
</div>

<style lang="sass">
  .chat-wrapper
    position: absolute
    top: 2.25rem
    right: 2.25rem
    display: flex
    width: 445px
    height: 768px

  .watermark
    position: absolute
    left: 1155px
    top: 700px
    opacity: .25
</style>
