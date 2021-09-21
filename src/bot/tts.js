export default function tts(text = '') {
  if (text.length > 280) return;
  const params = new URLSearchParams({ text, provider: 'gcp' });
  const audio = new Audio(`/tts?${params.toString()}`);
  audio.play();
}