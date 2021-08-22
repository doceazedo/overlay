import dotenv from 'dotenv';
dotenv.config();

export async function get({ params }) {
  const res = await fetch(`https://api.twitch.tv/helix/users?login=${params.login}`, {
    headers: {
      'Authorization': `Bearer ${process.env['TWITCH_OAUTH_TOKEN']}`,
      'Client-Id': process.env['TWITCH_CLIENT_ID']
    }
  });
  const twitch = await res.json();

  const image = await fetch(twitch.data[0].profile_image_url);
  const buffer = await image.buffer();

  return {
    headers: {
      'content-type': 'image/png'
    },
    body: buffer
  }
}