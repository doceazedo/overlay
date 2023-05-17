<h1 align="center">DoceAzedo's Overlay</h1>

<p align="center">
  A set of highly interactive scenes for my <a href="https://twitch.tv/doceazedo911">live coding streams</a>, including a Spotify now playing widget, Reddit memes while I'm away, custom icons and tons of chat commands.
</p>

<p align="center">
  <img src="./apps/overlay/static/assets/img/screenshot.gif" />
  <sup>Cute wallpaper made by the outstanding <a href="https://twitter.com/saroliro/status/1417469066604859393">@saroliro</a> ✨</sup>
</p>

## 🗂 What's inside?

This monorepo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following applications:

- [`apps/bot`](./apps/bot): a TypeScript Twitch chat bot
- [`apps/overlay`](./apps/overlay): a SvelteKit app with stream overlays

## 📝 Notes

- This project is in **constant development** and I'm always open for new features ideas and pull requests! 🥳
- The overlay has fixed sizes and expect the browser to have a resolution of `1920x1080` and your display to have a custom resolution of `1440x1080` (or just make sure your windows have around this size to always be in frame). 🖥

## 🧰 Installation

1. Clone this repository.
2. Run `npm install` to install the dependencies.
3. Create a [Twitch app](https://dev.twitch.tv/docs/authentication/register-app) and grab an [OAuth token](https://twitchapps.com/tokengen) - this can be from your personal account or any other, as no messages will be sent from it - with the following scopes: `chat:read chat:edit channel:moderate whispers:read whispers:edit channel_editor channel:read:subscriptions`.
4. Create a [Spotify app](https://developer.spotify.com/dashboard/login) and grab your [refresh token](https://benwiz.com/blog/create-spotify-refresh-token) with the `user-read-currently-playing` scope.
5. For Google TTS to work, grab your GCP application credentials by following [these steps](https://www.npmjs.com/package/@google-cloud/text-to-speech#before-you-begin).
6. For Amazon Polly TTS to work, grab your AWS keys by following [these steps](https://docs.aws.amazon.com/polly/latest/dg/setting-up.html).
7. Copy the **.env.example** file to **.env** on all directories inside **/apps** and fill them.
8. Run `(cd ../apps/overlay && npx prisma migrate dev)` to setup the database.

> **Note**: This entire process may soon be replaced for a more convenient post-install script.

## 🤹‍♂️ Usage

You can start the production applications with:

```bash
npm run start
```

By default, the overlay will be available at http://localhost:2424.

---

If you want to contribute or develop custom features, you can start the development server with:

```bash
npm run dev
```

By default, the overlay will be available at http://localhost:2425.

## 🧑‍💻 Development

To create a new command use the following command:

```sh
npm run cmd:new <command> [...aliases]
# eg: npm run cmd:new hello ola hola
```
