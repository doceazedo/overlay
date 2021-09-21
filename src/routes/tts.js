import { generateGCPAudio } from '../utils/api';
import { generatePollyAudio } from '../utils/api';

export async function get({ query }) {
  let audio;

  switch (query.get('provider')) {
    case 'gcp':
      audio = await generateGCPAudio(query.get('text'), 'pt-BR');
      break;

    case 'aws':
      audio = await generatePollyAudio(query.get('text'), query.get('voiceID') || 'Ricardo');
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