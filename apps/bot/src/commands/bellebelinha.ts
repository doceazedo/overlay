import { broadcast } from '../utils';
import type { Command } from '.';

const videoUrl = [
  '/assets/video/bellebelinha-banheiro-nb.mp4', // Cadê os banheiros dos não binários
  '/assets/video/bellebelinha-luisa-sonza.mp4', // Cadê os banheiros dos não binários + Luisa
  '/assets/video/bellebelinha-hablo-mesmo.mp4', // Eu hablo mesmo
  '/assets/video/bellebelinha-sarrada-cara.mp4', // Sarrada na cara
  '/assets/video/bellebelinha-classico.mp4', // Quantos belle belinha pegou
];

export const bellebelinha: Command = {
  aliases: [
    'bellebelinha',
    'hablo',
    'hablomesmo',
    'euhablomesmo',
    'naobinarios',
    'cadeobanheiro',
    'belle',
    'belinha',
    'neusa',
    'neusaneusinha'
  ],
  exec: async () =>
    broadcast(
      'playvideo',
      videoUrl[Math.floor(Math.random() * videoUrl.length)]
    ),
};
