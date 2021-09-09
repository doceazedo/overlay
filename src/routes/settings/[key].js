import { Setting } from '../../models';
import 'dotenv/config';

export async function get({ params }) {
  await Setting.sync();
  const setting = await Setting.findOrCreate({
    where: { key: params.key },
    defaults: { key: params.key },
    raw: true
  });

  return {
    body: {
      key: setting[0].key,
      value: setting[0].value
    }
  }
}

export async function post({ params, body }) {
  await Setting.sync();
  const { key } = params;
  const { value } = body;

  const [setting, created] = await Setting.findOrCreate({
    where: { key },
    defaults: { key, value }
  });

  if (!created) {
    if (value) setting.value = value;
    await setting.save();
  }

  return {
    body: {
      setting, created
    }
  }
}