import path from 'path';
import fs from 'fs';
import { broadcast } from '.';

export const playAudio = (buffer: any) => broadcast('playaudio', buffer);

export const playAudioFromFile = (filename: string) => {
  const filepath = path.resolve(`./assets/audio/${filename}`);
  const buffer = fs.readFileSync(filepath);
  playAudio(buffer);
};
