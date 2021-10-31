export default function playTTS(provider = '', text = '', voiceID = 'Ricardo') {
  if (text.length > 280) return;

  const params = new URLSearchParams({ provider, text, voiceID });
  let audioURL = `/tts?${params.toString()}`;
  if (provider == 'cybervox') audioURL = `/cybervox/audio?${params.toString()}`;

  const audio = new Audio(audioURL);
  if (provider == 'cybervox') audio.volume = .5;
  audio.play();
}