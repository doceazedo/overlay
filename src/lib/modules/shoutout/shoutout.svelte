<script lang="ts">
  import { socket } from '$lib/modules';
  import { Shoutout } from '$lib/components';
  import { shoutout, SHOUTOUT_INFO, SHOUTOUT_SHOW } from '.';
  import type { UserResponse } from '$lib/clients/users';

  socket.on('cmd:sh', (user: UserResponse) => {
    shoutout({ avatar: user.avatar, name: user.displayName });
  });
</script>

{#if $SHOUTOUT_SHOW}
  <Shoutout info={$SHOUTOUT_INFO} />
{/if}
