<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let src: string = null;

  let video: HTMLVideoElement;

  const handleFinish = () => (src = null);
  const handleLoad = () => (video.volume = 1);
</script>

<div class="video-player-wrapper">
  {#if !!src}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      bind:this={video}
      transition:fly={{ duration: 300, y: 64, opacity: 0, easing: quintOut }}
      {src}
      autoplay
      on:loadeddata={handleLoad}
      on:ended={handleFinish}
    />
  {/if}
</div>

<style lang="sass">
  .video-player-wrapper
    position: absolute
    top: 0
    left: 0
    display: flex
    align-items: flex-end
    width: 1412px
    height: 1080px
    padding: 3rem

    video
      height: 24rem
      border-radius: 1.5rem
    // pointer-events: none
</style>
