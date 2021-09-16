export default function tts(text = '') {
  if (text.length > 280) return;
  const params = new URLSearchParams({ text });
  const audio = new Audio(`/tts?${params.toString()}`);
  audio.play();
}