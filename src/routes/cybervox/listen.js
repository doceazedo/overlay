import fs from 'fs';
import { browser } from '../../utils/api';
import 'dotenv/config';

export async function get() {
  const channelId = process.env['TWITCH_CHANNEL_ID'];

  const page = await browser();
  await page.goto(`https://vox-twitch.monique.dev/layer/${channelId}/?layer-name=VoxAtTwitch&layer-width=1920&layer-height=1080`);

  const saveAudio = data => fs.writeFileSync('./static/assets/json/cybervox.json', data);

  await page.exposeFunction('saveAudio', saveAudio);

  await page.evaluate((channelId) => {
    const ws = new WebSocket(`wss://vox-twitch.monique.dev/ws/${channelId}`);
    ws.addEventListener('message', event => saveAudio(event.data));
  }, channelId);

  return {
    body: {}
  }
}