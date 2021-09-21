export default function playTTS(provider = '', text = '', voiceID = 'Ricardo') {
  if (text.length > 280) return;
  const params = new URLSearchParams({ provider, text, voiceID });
  const audio = new Audio(`/tts?${params.toString()}`);
  audio.play();
}