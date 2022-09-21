<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { elasticOut, elasticIn } from 'svelte/easing';

  export let title: string,
    message = '',
    image: string;

  const transition = { duration: 1200, x: -400 };

  onMount(async () => {});
</script>

<div
  class="alert-wrapper"
  in:fly={{ ...transition, easing: elasticOut }}
  out:fly={{ ...transition, easing: elasticIn }}
>
  <div class="image" style="background-image:url({image})" />
  <div class="alert">
    <h1>{title}</h1>
    {#if !!message.length}
      <p>{message}</p>
    {/if}
  </div>
</div>

<style lang="sass">
  .alert-wrapper
    position: absolute
    top: 0
    left: 1rem
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    height: 100%

  .image
    width: 20rem
    background-color: #070212
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    aspect-ratio: 16 / 9
    border-radius: 1rem
    margin-bottom: -2rem
    z-index: 1

  .alert
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    text-align: center
    width: 24rem
    padding: 3rem 1rem 1rem
    border-radius: 1rem
    background-color: #6930c3
    transition: all .2s ease-out

    h1
      font-size: 1.5rem
      font-weight: 700

    p
      font-size: 1.25rem
      color: rgba(#fff, .75)
      margin-top: .25rem
</style>
