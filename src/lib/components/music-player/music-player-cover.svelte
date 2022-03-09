<script lang="ts">
  export let cover = '';

  let loaded = false;
</script>

<img
  src={cover}
  alt=""
  class:is-loaded={loaded}
  on:load={() => (loaded = true)}
/>

<style lang="sass">
  img
    height: 3.5rem
    width: 3.5rem
    border-radius: .5rem
    transition: all .2s ease

    &:not(.is-loaded)
      opacity: 0
</style>
