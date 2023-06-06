import type { ChatUserstate } from 'tmi.js';
import { age } from './age';
import { alan } from './alan';
import { ban } from './ban';
import { bellebelinha } from './bellebelinha';
import { blog } from './blog';
import { chuu } from './chuu';
import { confetti } from './confetti';
import { discord } from './discord';
import { dog } from './dog';
import { evaluate } from './eval';
import { faker } from './faker';
import { first } from './first';
import { followage } from './followage';
import { help } from './help';
import { hug } from './hug';
import { kiss } from './kiss';
import { larissamanoela } from './larissamanoela';
import { lurk } from './lurk';
import { maldicao } from './maldicao';
import { marquee } from './marquee';
import { odeiopc } from './odeiopc';
import { overlay } from './overlay';
import { ping } from './ping';
import { pix } from './pix';
import { pronouns } from './pronouns';
import { punch } from './punch';
import { rasteira } from './rasteira';
import { sh } from './sh';
import { site } from './site';
import { social } from './social';
import { song } from './song';
import { specs } from './specs';
import { sr } from './sr';
import { svelte } from './svelte';
import { team } from './team';
import { tronco } from './tronco';
import { trpc } from './trpc';
import { tts } from './tts';
import { whois } from './whois';
import { wrongsong } from './wrongsong';
import { xixi } from './xixi';
import { xxx } from './xxx';

export type Command = {
  aliases?: string[];
  exec: (input: string, args: string[], user: ChatUserstate) => void;
};

export const commands: Command[] = [
  age,
  alan,
  ban,
  bellebelinha,
  blog,
  chuu,
  confetti,
  discord,
  dog,
  evaluate,
  faker,
  first,
  followage,
  help,
  hug,
  kiss,
  larissamanoela,
  lurk,
  maldicao,
  marquee,
  odeiopc,
  overlay,
  ping,
  pix,
  pronouns,
  punch,
  rasteira,
  sh,
  site,
  social,
  song,
  specs,
  sr,
  svelte,
  team,
  tronco,
  trpc,
  tts,
  whois,
  wrongsong,
  xixi,
  xxx,
];
