import { shoutout, showShoutout } from '../../stores';

export const sh = {
  exec: async (client, channel, tags, args) => {
    const user = args.join(' ');
    const data = await(await fetch(`/users/${user}`)).json();
    console.log(data);
    
    shoutout.set({ ...data.user, user });
    showShoutout.set(true);
    setTimeout(() => showShoutout.set(false), 10000);

    console.log(`Shoutout to ${user}`);
  }
}