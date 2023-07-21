import { promises as fs, existsSync } from "fs";
import { confirm, input } from "@inquirer/prompts";

const askUntilTrue = async (message: string, error: string) => {
  const isTrue = await confirm({
    message,
  });
  if (!isTrue) {
    console.log("");
    console.log(error);
    console.log("");
    await askUntilTrue(message, error);
  }
};

console.log(` _____                                       _       _     
|  __ \\                   /\\                | |     ( )    
| |  | | ___   ___ ___   /  \\    _______  __| | ___ |/ ___ 
| |  | |/ _ \\ / __/ _ \\ / /\\ \\  |_  / _ \\/ _\` |/ _ \\  / __|
| |__| | (_) | (_|  __// ____ \\  / /  __/ (_| | (_) | \\__ \\
|_____/ \\___/_\\___\\___/_/    \\_\\/___\\___|\\__,_|\\___/  |___/
            / __ \\               | |                       
           | |  | |_   _____ _ __| | __ _ _   _            
           | |  | \\ \\ / / _ \\ '__| |/ _\` | | | |           
           | |__| |\\ V /  __/ |  | | (_| | |_| |           
            \\____/  \\_/ \\___|_|  |_|\\__,_|\\__, |           
                                           __/ |           
                                          |___/            `);

console.log(`

Valeu por instalar meu overlay! :) Bora configurar?

🚨 NÃO FAÇA ISSO EM LIVE! Vamos mexer com dados sensíveis e não queremos vazar nada.

Primeiro de tudo, você precisa criar uma aplicação no Twitch Developers Console.

Você pode fazer isso nesse link: https://dev.twitch.tv/console

`);

await askUntilTrue(
  "Você já criou o aplicativo no Console?",
  "Vai lá, eu te espero!"
);

console.log(`
Show! Agora nós vamos usar o Twitch Token Generator para gerar os tokens das contas de streamer e de bot.

Para isso, você precisar adicionar o link "https://twitchtokengenerator.com" no campo de URL de redirecionamento OAuth da sua aplicação.

Não se esqueça de salvar!
`);

await askUntilTrue(
  "Você já configurou a URL de redirecionamento?",
  "Então configure por favor seguindo as intruções acima."
);

console.log(`
Massa! Confio em você porquê eu não vou testar.

Agora informe o ID e segredo do cliente, por favor?
`);

const twitchClientId = await input({
  message: "ID do cliente:",
});

const twitchClientSecret = await input({
  message: "Segredo do cliente:",
});

const getTwitchUser = async (clientId: string, token: string) => {
  try {
    const resp = await fetch("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": clientId,
      },
    });
    const data = await resp.json();
    return data?.data?.[0] || null;
  } catch (error) {
    return null;
  }
};

const askOAuthTokens = async (type: "BOT" | "STREAMER") => {
  const botScope = "chat:read+chat:edit";
  const streamerScope =
    "chat:edit+chat:read+bits:read+channel:manage:broadcast+channel:read:charity+channel:edit:commercial+channel:read:editors+channel:manage:extensions+channel:read:goals+channel:read:guest_star+channel:manage:guest_star+channel:read:hype_train+channel:manage:moderators+channel:read:polls+channel:manage:polls+channel:read:predictions+channel:manage:predictions+channel:manage:raids+channel:read:redemptions+channel:manage:redemptions+channel:manage:schedule+channel:read:stream_key+channel:read:subscriptions+channel:manage:videos+channel:read:vips+channel:manage:vips+channel:moderate+user:edit+user:edit:follows+user:read:blocked_users+user:manage:blocked_users+user:read:broadcast+user:manage:chat_color+user:read:email+user:read:follows+user:read:subscriptions+user:manage:whispers+moderator:manage:announcements+moderator:manage:automod+moderator:read:automod_settings+moderator:manage:automod_settings+moderator:manage:banned_users+moderator:read:blocked_terms+moderator:manage:blocked_terms+moderator:manage:chat_messages+moderator:read:chat_settings+moderator:manage:chat_settings+moderator:read:chatters+moderator:read:followers+moderator:read:guest_star+moderator:manage:guest_star+moderator:read:shield_mode+moderator:manage:shield_mode+moderator:read:shoutouts+moderator:manage:shoutouts";

  console.log(`
Agora acesse sua conta de ${type} e acesse o link abaixo:

https://twitchtokengenerator.com/?scope=${
    type == "BOT" ? botScope : streamerScope
  }&auth=auth_stay

Nesse site você deve:
  1. Preencher o campo CLIENT SECRET com "${twitchClientSecret}"
  2. Preencher o campo CLIENT ID com "${twitchClientId}"
  3. Clicar no botão "Generate Token!"

Depois de permitir acesso, seus tokens vão aparecer em verde na seção "Generated Tokens".
`);

  const accessToken = await input({
    message: `ACCESS TOKEN da conta de ${type}:`,
  });

  const refreshToken = await input({
    message: `REFRESH TOKEN da conta de ${type}:`,
  });

  // TODO: test if token is valid
  const tokens = {
    accessToken,
    refreshToken,
    expiresIn: 5184000, // 60 days in seconds
    scope: type == "BOT" ? botScope.split("+") : streamerScope.split("+"),
    obtainmentTimestamp: 0,
  };

  const user = await getTwitchUser(twitchClientId, accessToken);
  if (!user) {
    console.log(`
❌ Não foi possível pegar os dados dessa conta.
    `);
    process.exit(1);
  }

  console.log(`
✅ Conectado com sucesso como ${user.display_name}.
  `);

  const accountIsCorrect = await confirm({
    message: `Essa é a sua conta de ${type}?`,
  });
  if (!accountIsCorrect) return await askOAuthTokens(type);

  await fs.writeFile(
    `./tokens/${user.id}.json`,
    JSON.stringify(tokens, null, 2)
  );

  return {
    user,
    tokens,
  };
};

const bot = await askOAuthTokens("BOT");
const streamer = await askOAuthTokens("STREAMER");

if (!existsSync(".env")) {
  const defaultEnv = await fs.readFile(".env.example");
  await fs.writeFile(".env", defaultEnv.toString());
}

const envFile = await fs.readFile(".env");
const envLines = envFile.toString().split("\n");
const editEnvLine = (key: string, value: string) => {
  const line = envLines.findIndex((x) => x.startsWith(key));
  const content = `${key}="${value}"`;
  if (line >= 0) {
    envLines[line] = content;
  } else {
    envLines.push(content);
  }
};

editEnvLine("TWITCH_CLIENT_ID", twitchClientId);
editEnvLine("TWITCH_CLIENT_SECRET", twitchClientSecret);
editEnvLine("PUBLIC_TWITCH_BOT_ID", bot.user.id);
editEnvLine("PUBLIC_TWITCH_BROADCASTER_ID", streamer.user.id);
editEnvLine("TWITCH_CHANNEL_NAME", streamer.user.display_name);

fs.writeFile(".env", envLines.join("\n"));

console.log(`
✅ Configurações salvas com sucesso! Você pode configurar mais parâmetros no arquivo ".env".

🌟 Não esqueça de dar uma estrelinha no repositório: https://github.com/doceazedo/overlay

Aproveite <3
`);
