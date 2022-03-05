<script lang="ts">
  import { onMount } from 'svelte';

  let count = 0;
  let items: number[] = [];

  const despawnItem = () => {
    items.shift();
    items = items;
  };

  const spawnItem = () => {
    items.push(count++);
    items = items;
    if (items.length > maxItems) despawnItem();
  };

  onMount(() => {
    spawnItem();
    setInterval(() => spawnItem(), interval);
  });

  export let interval: number,
    speed: number,
    maxItems: number,
    width: number,
    direction: 'left' | 'right',
    overflow = false;
</script>

<div
  class="conveyor-belt"
  style="--speed:{speed}s; --direction:{direction}; --target:-{width}px;"
  class:overflow
>
  {#each items as key, i (key)}
    <div data-key={key} class="conveyor-belt-item">
      <slot />
    </div>
  {/each}
</div>

<style lang="sass">
  .conveyor-belt
    position: relative
    display: flex
    align-items: center
    width: 100%
    height: 100%

    &:not(.overflow)
      overflow: hidden

    &-item
      position: absolute
      width: fit-content
      height: fit-content
      animation: var(--direction) var(--speed) linear forwards

  @keyframes -global-left
    from
      left: 100%

    to
      left: var(--target)

  @keyframes -global-right
    from
      right: 100%

    to
      right: var(--target)
</style>
