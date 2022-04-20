<script lang="ts">
  import { AlertWrapper, Alert } from '$lib/components';
  import { streamlabsAlertListener } from '$lib/modules/streamlabs';
  import { throwConfetti } from '$lib/modules/confetti';
  import type { StreamlabsAlert } from '$lib/modules/streamlabs';
  import { browser } from '$app/env';

  export let mute = false;

  let alertsQueue: StreamlabsAlert[] = [];
  let alert: StreamlabsAlert;

  const nextAlert = () => {
    if (!browser) return;
    alert = alertsQueue[0];

    if (!mute) {
      const alertAudio = new Audio(`/assets/audio/alert-${alert.type}.mp3`);
      alertAudio.volume = alert.volume;
      alertAudio.play();
    }

    if (alert.type == 'raid') throwConfetti(alert.timeout);

    setTimeout(() => {
      alertsQueue.shift();
      alert = null;
      setTimeout(() => alertsQueue.length && nextAlert(), 1000);
    }, alert.timeout);
  };

  streamlabsAlertListener.subscribe((alert) => {
    if (alert == null) return;
    alertsQueue.push(alert);
    if (alertsQueue.length == 1) nextAlert();
  });
</script>

<AlertWrapper>
  {#if alert != null}
    <Alert avatar={alert.avatar} title={alert.title} message={alert.message} />
  {/if}
</AlertWrapper>
