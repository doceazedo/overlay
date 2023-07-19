import path from "path";
import fs from "fs";
import { socket } from "ws-client";

export const playAudio = (buffer: any) => socket.emit("play-audio", buffer);

export const playAudioFromFile = (filename: string) => {
  const filepath = path.resolve(`./assets/audio/${filename}`);
  console.log(`Playing ${filepath}`);
  const buffer = fs.readFileSync(filepath);
  playAudio(buffer);
};
