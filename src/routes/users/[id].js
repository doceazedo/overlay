import { User } from '../../models';

export async function get({ params }) {
  await User.sync();
  const user = await User.findByPk(params.id);

  return {
    body: {
      user
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