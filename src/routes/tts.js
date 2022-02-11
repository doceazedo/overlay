import { generateGCPAudio, generatePollyAudio } from '../utils/api';

export async function get({ url }) {
  let audio;

  switch (url.searchParams.get('provider')) {
    case 'gcp':
      audio = await generateGCPAudio(url.searchParams.get('text'), 'pt-BR');
      break;

    case 'aws':
      audio = await generatePollyAudio(url.searchParams.get('text'), url.searchParams.get('voiceID') || 'Ricardo');
      break;
  }

  if (!audio) {
    return {
      status: 500,
      error: new Error('Could not generate audio')
    }
  }

  return {
    headers: {
      'content-type': 'audio/mpeg'
    },
    body: audio
  };
}