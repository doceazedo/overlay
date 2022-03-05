<script lang="ts">
  import { ConveyorBelt, BrandLogo } from '$lib/components';

  export let direction: 'left' | 'right';
</script>

<div class="wrapper">
  <ConveyorBelt interval={5100} speed={30} maxItems={8} width={354} {direction}>
    <BrandLogo height={128} />
  </ConveyorBelt>
</div>

<style lang="sass">
  .wrapper
    flex-shrink: 0
    width: 100%
    height: 10rem
    opacity: .2
</style>
