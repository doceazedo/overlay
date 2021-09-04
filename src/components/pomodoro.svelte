<script>
  import { browser } from '$app/env';

  const newTimer = minutes => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    totalTime = 60000 * minutes;
    playedAlert = false;
    return date.getTime();
  }

  const pomodoro = () => {
    const now = new Date().getTime();
    const distance = timerEnding - now;

    let min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((distance % (1000 * 60)) / 1000);

    if (min < 10) min = `0${min}`;
    if (sec < 10) sec = `0${sec}`;

    timer =  `${min}:${sec}`;
    percentage = 100 - (distance * 100) / totalTime;

    if (distance < 0) {
      timer = `00:00`;
      percentage = 100;

      if (!playedAlert && browser) {
        playedAlert = true;
        const alert = new Audio('/assets/audio/pomodoro-alert.mp3');
        alert.play();
      }
    }
  }

  const toggleFocus = () => {
    focus = !focus;
    timerEnding = newTimer(focus ? 25 : 5);
    pomodoro();
  }

  let totalTime = 0;
  let percentage = 0;
  let playedAlert = false;
  let timerEnding = newTimer(0);
  let timer = '00:00';
  let focus = false;

  setInterval(pomodoro, 250);
  pomodoro();
</script>

<div id="pomodoro" on:click={toggleFocus}>
  <h1 class="timer">{focus ? 'Estudando...' : 'Descontração...' }<span>{timer}</span></h1>
  <div class="bar">
    <div style="width:{percentage}%"></div>
  </div>
</div>

<style type="text/sass">
  #pomodoro
    display: flex
    flex-direction: column
    flex-shrink: 0
    margin-bottom: 1rem
    font-size: 1.75rem
    background-color: #242424
    border-radius: .5rem
    overflow: hidden

    .timer
      display: flex
      padding: .75rem

      span
        margin-left: auto
        font-weight: 700

    .bar
      height: .25rem
      background-color: #1a1a1a

      div
        height: 100%
        width: 25%
        background-color: #ffd479
</style>