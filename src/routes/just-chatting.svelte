<script>
  import { Alerts, Chat } from '../components'; 
  import { alertsWS, tmiClient } from '../utils'
</script>

<div class="alerts-wrapper">
  <Alerts {alertsWS} mute={true} />
</div>

<div class="chat-wrapper">
  <Chat {tmiClient} />
</div>

<style type="text/sass">
  .alerts-wrapper
    position: absolute
    display: flex
    justify-content: flex-end
    width: 100%
    padding: 1rem

  .chat-wrapper
    position: absolute
    height: 100%
    width: 500px
    padding: 1rem
</style>