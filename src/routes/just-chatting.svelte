<script>
  import { Alerts, Chat } from '../components'; 
  import { alertsWS, tmiClient } from '../utils'
</script>

<div class="alerts-wrapper">
  <Alerts {alertsWS} />
</div>

<div class="chat-wrapper">
  <Chat {tmiClient} />
</div>

<style type="text/sass">
  .alerts-wrapper
    position: absolute
    display: flex
    justify-content: center
    width: 100%
    margin-top: 1rem

  .chat-wrapper
    position: absolute
    height: 100%
    padding: 1rem
</style>