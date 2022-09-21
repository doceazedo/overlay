<script lang="ts">
  export let src: string,
    alt = '';
  let loaded = false;
</script>

<figure class="avatar">
  <img {src} {alt} class:is-loaded={loaded} on:load={() => (loaded = true)} />
</figure>

<style lang="sass">
  .avatar
    height: 2.75rem
    width: 2.75rem
    border-radius: 50%
    background-color: #191919

    img
      height: 100%
      width: 100%
      border-radius: 50%
      transition: all .2s ease

      &:not(.is-loaded)
        opacity: 0
</style>
