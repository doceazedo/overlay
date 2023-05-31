import textToSpeech from '@google-cloud/text-to-speech';
import AWS from 'aws-sdk';
import { playAudio } from '.';
import 'dotenv/config';
import { tikTokDefaultVoices } from '../helpers';

export const playGoogleTTS = async (text: string, languageCode: string) => {
  const client = new textToSpeech.TextToSpeechClient();
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: { languageCode },
    audioConfig: { audioEncoding: 'MP3' },
  });

  playAudio(response.audioContent);
};

export const playPollyTTS = async (
  text: string,
  voiceId: string,
  ssml = false
) => {
  const params = {
    Text: text,
    TextType: ssml ? 'ssml' : 'text',
    OutputFormat: 'mp3',
    VoiceId: voiceId,
  };

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const polly = new AWS.Polly({
    signatureVersion: 'v4',
  });

  const audio = await polly.synthesizeSpeech(params).promise();
  if (audio.AudioStream instanceof Buffer) playAudio(audio.AudioStream);
};

const BASE_URL_TIKTOK_TTS = 'https://tiktok-tts.weilnet.workers.dev';

export const playTikTokTTS = async (text: string, voice: string) => {
  try {
    const resp = await fetch(`${BASE_URL_TIKTOK_TTS}/api/generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, voice }),
    });
    const data = await resp.json();
    if (!resp.ok || !data.success || !data.data) throw Error(data);
    const audio = Buffer.from(data.data, 'base64');
    playAudio(audio);
  } catch (error) {
    console.error(error);
  }
};

export const playRandomTikTokTTS = (text: string) => {
  const voiceId =
    tikTokDefaultVoices[Math.floor(Math.random() * tikTokDefaultVoices.length)];
  return playTikTokTTS(voiceId, text);
};
