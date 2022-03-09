<script lang="ts">
  import { Sidebar } from '$lib/components';
  import { Chat, MusicPlayer } from '$lib/modules';
  import { GET } from '$lib/utils';
</script>

<Sidebar showHandcam={GET('handcam')}>
  <MusicPlayer />
  <Chat />
</Sidebar>
