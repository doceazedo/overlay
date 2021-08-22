// Please use event listeners to run functions.
document.addEventListener('onLoad', function(obj) {
	// obj will be empty for chat widget
	// this will fire only once when the widget loads
});

const chatEl = document.querySelector('#log');
let blur = setInterval(() => chatEl.classList.add('inactive'), 5000);

document.addEventListener('onEventReceived', function(obj) {
  chatEl.classList.remove('inactive');
  clearInterval(blur);
  blur = setInterval(() => chatEl.classList.add('inactive'), 20000);
});