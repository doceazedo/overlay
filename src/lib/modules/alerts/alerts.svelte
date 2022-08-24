<script lang="ts">
  import { browser } from '$app/env';
  import { socket } from '$lib/modules';
  import { throwConfetti } from '$lib/modules/confetti';
  import { Alert } from '$lib/components';
  import { sleep } from '$lib/utils';

  type AlertEventData = {
    title: string;
    message?: string;
    image?: string;
    duration?: number;
    audio?: string;
    // TODO: tts?: string;
  };

  const defaultDuration = 7500;
  const defaultImage = '';
  const delay = 750;

  let alertData: AlertEventData;
  let alertsQueue: AlertEventData[] = [];
  let showAlert = false;

  const handleAlertEvent = async (data: AlertEventData) => {
    alertsQueue.push(data);
    if (alertsQueue.length == 1) showNextAlert();
  };

  const showNextAlert = async () => {
    if (!browser || !alertsQueue.length) return;

    alertData = alertsQueue[0];
    showAlert = true;
    if (alertData.audio) {
      const audio = new Audio();
      audio.src = alertData.audio;
      audio.play();
    }

    // Await for alert duration
    await sleep(alertData.duration || defaultDuration);
    showAlert = false;

    // Await for delay/transition
    await sleep(delay);
    alertsQueue.shift();
    showNextAlert();
  };

  socket.on('event:raid', () => throwConfetti(15000));
  socket.on('event:alert', handleAlertEvent);
</script>

{#if showAlert}
  <Alert
    title={alertData.title}
    message={alertData.message}
    image={alertData.image || defaultImage}
  />
{/if}
