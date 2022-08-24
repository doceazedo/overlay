<script lang="ts">
  import { socket } from '$lib/modules';
  import { throwConfetti } from '$lib/modules/confetti';
  import { Alert } from '$lib/components';

  // TODO: Fila
  // TODO: Áudio de notificação

  type AlertEventData = {
    title: string;
    message?: string;
    image?: string;
    duration?: number;
    // TODO: tts?: string;
  };

  const defaultDuration = 7500;
  const defaultImage = '';

  let showAlert = false;
  let alertData: AlertEventData;

  const handleFollowEvent = async (data: AlertEventData) => {
    alertData = data;
    showAlert = true;

    setTimeout(() => {
      showAlert = false;
    }, data.duration || defaultDuration);
  };

  socket.on('event:raid', () => throwConfetti(15000));
  socket.on('event:alert', handleFollowEvent);
</script>

{#if showAlert}
  <Alert
    title={alertData.title}
    message={alertData.message}
    image={alertData.image || defaultImage}
  />
{/if}
