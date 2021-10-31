import AWS from 'aws-sdk';
import 'dotenv/config';

export default async function generatePollyAudio (text, voiceID) {
  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: voiceID
  }

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const polly = new AWS.Polly({
    signatureVersion: 'v4'
  });

  return polly.synthesizeSpeech(params).promise().then(audio => {
    if (audio.AudioStream instanceof Buffer) return audio.AudioStream;
  })
}