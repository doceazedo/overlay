import puppeteer from 'puppeteer';
import 'dotenv/config';
import axios from 'axios';
import FormData from 'form-data';

export async function get({ query }) {
  const channelID = process.env['TWITCH_CHANNEL_ID'];
  const cybervoxKey = process.env['VITE_CYBERVOX_KEY'];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(`https://vox-twitch.monique.dev/layer/${channelID}/?layer-name=VoxAtTwitch&layer-width=1920&layer-height=1080`);

  setTimeout(async () => {
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
  }, 500);

  const data = await page.evaluate(channelID => {
    return new Promise((resolve) => {
      const ws = new WebSocket(`wss://vox-twitch.monique.dev/ws/${channelID}`);
      ws.addEventListener('message', event => resolve(JSON.parse(event.data)));
    })
  }, channelID);

  await browser.close();

  return {
    status: 302,
    headers: {
      location: data.audio_url
    }
  };
}