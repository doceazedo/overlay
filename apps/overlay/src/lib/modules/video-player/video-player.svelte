<script lang="ts">
  import { socket } from '$lib/modules';
  import { VideoPlayer } from '$lib/components';

  let src = '';

  socket.on('playvideo', (message: string) => {
    if (!!src) return;
    src = message;
  });
</script>

<VideoPlayer bind:src />
