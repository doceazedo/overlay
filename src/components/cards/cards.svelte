<script>
  export let cards = [];
</script>

<ul>
  {#each cards as card}
    <li>{card}</li>
  {/each}
</ul>

<style lang="sass">
  ul
    display: flex
    margin-bottom: 1rem
    
    li
      flex: 1 1 0px
      background-color: #242424
      border-radius: .5rem
      padding: .75rem
      text-align: center

      &:not(:last-child)
        margin-right: 1rem
</style>