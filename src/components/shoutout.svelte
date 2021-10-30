<script>
  import { fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { shoutout } from '../stores';
</script>

<div id="shoutout">
  <figure transition:scale={{duration: 800, opacity: 0, start: .25, easing: quintOut}} style="background-image:url({$shoutout?.avatar})"></figure>
  <div transition:fly={{duration: 800, y: 96, easing: quintOut}}>
    <span>{$shoutout?.user}</span>
  </div>
</div>

<style lang="sass">
  #shoutout
    position: absolute
    bottom: 1rem
    left: 1rem
    display: flex
    flex-direction: column
    align-items: center

    figure
      height: 12rem
      width: 12rem
      margin-bottom: -1.5rem
      border-radius: 50%
      z-index: 1
      background-position: center
      background-repeat: no-repeat
      background-size: cover

    div
      display: flex
      align-items: center
      height: 5rem
      padding: 0 3rem
      border-radius: .5rem
      font-size: 1.75rem
      font-weight: 700
      text-transform: lowercase
      background-color: #242424
      color: #fff

      span
        margin-bottom: -.5rem
</style>