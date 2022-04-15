<script lang="ts">
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import type { ShoutoutInfo } from '$lib/modules';

  export let info: ShoutoutInfo;
</script>

<div class="shoutout">
  <figure
    class="avatar"
    transition:scale={{
      duration: 800,
      opacity: 0,
      start: 0.25,
      easing: quintOut,
    }}
    style="background-image:url({info.avatar})"
  />
  <div class="name" transition:fly={{ duration: 800, y: 96, easing: quintOut }}>
    <span>{info.name}</span>
  </div>
  <div
    class="line"
    transition:fly={{ duration: 800, opacity: 0, x: -96, easing: quintOut }}
  />
</div>

<style lang="sass">
  .shoutout
    position: absolute
    bottom: 1rem
    left: 1rem
    display: flex
    flex-direction: column
    align-items: center
    animation: float 4s ease-in-out infinite

    .avatar
      height: 12rem
      width: 12rem
      margin-bottom: -1.5rem
      border-radius: 50%
      z-index: 1
      background-position: center
      background-repeat: no-repeat
      background-size: cover

    .name
      display: flex
      align-items: center
      height: 5rem
      padding: 0 3rem
      border-radius: .5rem
      font-size: 1.75rem
      font-weight: 700
      text-transform: lowercase
      background-color: #070212
      border-radius: 24px
      color: #fff
      z-index: 10

      span
        margin-bottom: -.5rem

    .line
      content: ''
      position: absolute
      left: 1rem
      bottom: 1rem
      width: 100%
      height: 5rem
      border: 2px solid #6930c3
      border-radius: 24px
      z-index: -1

  @keyframes float
    0%
      transform: translateY(0)

    50%
      transform: translateY(-1rem)

    100%
      transform: translateY(0)
</style>
