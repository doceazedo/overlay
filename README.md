<h1 align="center">DoceAzedo's Overlay</h1>

<p align="center">
  The heart of my <a href="https://twitch.tv/doceazedo911">live coding streams</a> — a set of widgets and scripts including live stats, custom alerts, rewards and tons of chat commands.
</p>

<p align="center">
  <img src="./assets/screenshot.gif" />
</p>

## 🗂 What's inside?

This monorepo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following **applications**:

- [`bot`](./apps/bot): a TypeScript Twitch chat bot and event listener
- [`overlay`](./apps/overlay): a SvelteKit app with stream widgets
- [`trpc-server`](./apps/trpc-server): a tRPC app to fetch third-party data
- [`ws-server`](./apps/ws-server): a Socket.IO app that acts as a message broker

You'll also find the following **packages**:

- [`db`](./packages/db): a LowDB powered JSON database for persistence
- [`trpc-client`](./packages/trpc-client): the tRPC client used by other apps
- [`twurple-auth`](./packages/twurple-auth): reusable Twurple auth data
- [`ws-client`](./packages/ws-client): the Socket.IO client used by other apps

Additionally, there are also a few other useful **directiories**:

- [`assets`](./assets): images you may add to your OBS scenes
- [`data`](./data): the folder where the database data is stored
- [`tokens`](./tokens): the folder that Twurple stores your tokens

## 🏃 Getting started

First off,

1. Clone this repository.
2. Run `npm install` to install the dependencies.
3. Run `npm run setup` to setup the required environment variables.
   - Please follow each steps of the setup carefully.
   - You might want to fill additional values on the `.env` file.
4. Run `npm run start` to initialize the app.

The bot will start and join the streamer's chat automatically.

The overlay widgets will be available at [localhost:42069](http://localhost:42069) by default. You can check the availables widgets in the [`routes`](./apps/overlay/src/routes) directory.

You can add these widgets as OBS browser sources. When doing that, you might need to add `body { background-color: rgba(0, 0, 0, 0) !important; }` to make sure OBS removes the background of the widget.

## 📝 Notes

- This project is in **constant development** and I'm always open for new features ideas and pull requests! 🥳
- If you want to replicate the overlay I use on my streams, you'll need to place everything in the exact positions and sizes as I do, which is currently not documented _yet_.
- The fancy transitions are handled by the [obs-move-transition](https://github.com/exeldro/obs-move-transition) plugin and a clever usage of [masks](./assets), both of which should also be setup manually.
- The Spotify now playing and volume features only work on macOS as they depend on AppleScript to work.

## License

This project is licensed under the [GNU General Public License v3.0](./LICENSE).
