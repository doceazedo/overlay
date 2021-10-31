import textToSpeech from '@google-cloud/text-to-speech';

export default async function generateGCPAudio (text, languageCode) {
  const client = new textToSpeech.TextToSpeechClient();
  const request = {
    input: { text },
    voice: { languageCode },
    audioConfig: {audioEncoding: 'MP3'},
  };
  
  const [ response ] = await client.synthesizeSpeech(request);
  return response.audioContent;
}