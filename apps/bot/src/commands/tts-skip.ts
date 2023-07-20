import { socket } from "ws-client";
import { createBotCommand } from "../commands";

const ttsSkip = createBotCommand(
  ["ttsskip", "ttskip", "tts-skip"],
  () => socket.emit("skip-audio"),
  true
);

export default ttsSkip;
