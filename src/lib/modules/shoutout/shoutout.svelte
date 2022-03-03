<script lang="ts">
  import { Shoutout } from '$lib/components';
  import { SHOUTOUT_INFO, SHOUTOUT_SHOW } from '.';
</script>

{#if $SHOUTOUT_SHOW}
  <Shoutout info={$SHOUTOUT_INFO} />
{/if}
