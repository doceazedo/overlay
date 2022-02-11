import { User } from '../../models';
import 'dotenv/config';

export async function get({ params }) {
  const getByLogin = isNaN(params.id);

  const getParams = getByLogin ? `?login=${params.id}` : `?id=${params.id}`;
  const res = await fetch(`https://api.twitch.tv/helix/users${getParams}`, {
    headers: {
      'Authorization': `Bearer ${process.env['TWITCH_OAUTH_TOKEN']}`,
      'Client-Id': process.env['TWITCH_CLIENT_ID']
    }
  });
  const twitch = await res.json();
  const avatar = twitch.data[0].profile_image_url;

  await User.sync();
  const user = await User.findOrCreate({
    where: { id: getByLogin ? twitch.data[0].id : params.id },
    defaults: { id: getByLogin ? twitch.data[0].id : params.id },
    raw: true
  });

  return {
    body: {
      user: { ...user[0], avatar },
    }
  }
}

export async function post({ params, request }) {
  await User.sync();
  const { id } = params;
  const { pronouns, team } = await request.json();

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