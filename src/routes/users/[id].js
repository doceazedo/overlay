import { User } from '../../models';
import 'dotenv/config';

export async function get({ params }) {
  await User.sync();
  const user = await User.findOrCreate({
    where: { id: params.id },
    defaults: { id: params.id },
    raw: true
  });

  const res = await fetch(`https://api.twitch.tv/helix/users?id=${params.id}`, {
    headers: {
      'Authorization': `Bearer ${process.env['TWITCH_OAUTH_TOKEN']}`,
      'Client-Id': process.env['TWITCH_CLIENT_ID']
    }
  });
  const twitch = await res.json();
  const avatar = twitch.data[0].profile_image_url;

  return {
    body: {
      user: { ...user[0], avatar },
    }
  }
}

export async function post({ params, body }) {
  await User.sync();
  const { id } = params;
  const { pronouns, team } = body;

  const [user, created] = await User.findOrCreate({
    where: { id },
    defaults: { id, pronouns, team }
  });

  if (!created) {
    if (pronouns) user.pronouns = pronouns;
    if (team) user.team = team;
    await user.save();
  }

  return {
    body: {
      user, created
    }
  }
}