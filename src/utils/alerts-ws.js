import { STREAMLABS_KEY } from '../env';

const alertsWS = window.io(`https://sockets.streamlabs.com?token=${STREAMLABS_KEY}`, {transports: ['websocket']});

export default alertsWS;