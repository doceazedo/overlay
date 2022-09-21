import { Server } from 'socket.io';
import { loggr } from './utils';
import 'dotenv/config';

const io = new Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  allowEIO3: true,
});

io.on('connection', (socket) => {
  loggr.debug(`New connection: ${socket.id}`);
});

export default io;
