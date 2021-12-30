import { shoutout, showShoutout } from '../../stores';

export const sh = {
  exec: async (client, channel, tags, args) => {
    if (tags['user-id'] != '98776633') {
      client.say(channel, `/color Red`);
      client.say(channel, `/me Somente o Doce pode usar esse comando 🤭`);
      return;
    }

    const user = args.join(' ');
    const data = await(await fetch(`/users/${user}`)).json();
    console.log(data);
    
    shoutout.set({ ...data.user, user });
    showShoutout.set(true);
    setTimeout(() => showShoutout.set(false), 10000);

    console.log(`Shoutout to ${user}`);
  }
}