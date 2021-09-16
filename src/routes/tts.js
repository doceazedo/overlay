import textToSpeech from '@google-cloud/text-to-speech';
import 'dotenv/config';

export async function get({ query }) {
  const client = new textToSpeech.TextToSpeechClient();
  const request = {
    input: {text: query.get('text')},
    voice: {languageCode: 'pt-BR'},
    audioConfig: {audioEncoding: 'MP3'},
  };
  const [ response ] = await client.synthesizeSpeech(request);

  return {
    headers: {
      'content-type': 'audio/mpeg'
    },
    body: response.audioContent
  }
}