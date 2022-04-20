<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Avatar } from '$lib/components';

  export let title: string,
    message = '',
    avatar: string;
</script>

<div
  class="alert"
  class:no-message={!message}
  transition:fly={{ duration: 800, y: -128, opacity: 0, easing: quintOut }}
>
  <figure>
    <Avatar src={avatar} />
  </figure>
  <div class="message">
    <h1>{@html title}</h1>
    {#if message}
      <p>{message}</p>
    {/if}
  </div>
</div>

<style lang="sass">
  .alert
    display: flex
    justify-content: center
    gap: 1rem
    background-color: #2d2d2d
    width: 600px
    padding: 1rem
    border-radius: .5rem
    color: #fff

    &.no-message
      align-items: center

      p
        display: none

    .message
      display: flex
      flex-direction: column
      justify-content: center

      h1
        font-size: 1.5rem

      p
        margin-top: .5rem
</style>
