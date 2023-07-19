import { playAudio } from "./play-audio";

const voices = ["br_003", "br_004", "br_005"];

const BASE_URL_TIKTOK_TTS = "https://tiktok-tts.weilnet.workers.dev";

export const playTikTokTTS = async (text: string, voice: string) => {
  try {
    const resp = await fetch(`${BASE_URL_TIKTOK_TTS}/api/generation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, voice }),
    });
    const data = await resp.json();
    if (!resp.ok || !data.success || !data.data) throw Error(data);
    const audio = Buffer.from(data.data, "base64");
    playAudio(audio);
  } catch (error) {
    console.error(error);
  }
};

export const playRandomTikTokTTS = (text: string) => {
  const voice = voices[Math.floor(Math.random() * voices.length)];
  return playTikTokTTS(text, voice);
};
