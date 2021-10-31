import 'dotenv/config';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

const fetchLatestAudio = lastAudio => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      const audio = JSON.parse(fs.readFileSync('./static/assets/json/cybervox.json', 'utf8'));
      if (audio.audio_url != lastAudio.audio_url) {
        clearInterval(interval);
        resolve(audio.audio_url);
      }
    }, 100);

    setTimeout(() => {
      if (interval) {
        clearInterval(interval);
        reject();
      }
    }, 10000);
  });
}

export async function get({ query }) {
  const lastAudio = JSON.parse(fs.readFileSync('./static/assets/json/cybervox.json', 'utf8'));

  const cybervoxKey = process.env['VITE_CYBERVOX_KEY'];

  const data = new FormData();
  data.append('text', query.get('text'));

  await axios({
    method: 'post',
    url: 'https://vox-twitch.monique.dev/tts/',
    headers: { 
      'Authorization': `Bearer ${cybervoxKey}`, 
      ...data.getHeaders()
    },
    data
  });

  const audioUrl = await fetchLatestAudio(lastAudio);

  return {
    status: 302,
    headers: {
      location: audioUrl
    }
  };
}