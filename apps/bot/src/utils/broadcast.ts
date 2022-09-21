import io from '../websockets';

export const broadcast = <T = any>(message: string, content?: T) => {
  io.local.emit(message, content);
};
