<script lang="ts">
  import { socket } from '$lib/modules';
  import { throwConfetti } from '../confetti';

  socket.on('event:raid', () => throwConfetti(15000));
</script>
