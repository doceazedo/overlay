import { sendStriped } from '../utils';
import type { Command } from '.';

const specsArr = [
  'CPU: AMD Ryzen 3600X',
  'RAM: 24GB (3x8) Crucial 3000MHz',
  'GPU: EVGA NVDIA GTX 1660',
  'ROM: 2TB NVMe (Crucial) + 480GB SATA (Crucial) + 500GB HDD (WD)',
  'Mobo: Gigabyte B450M DS3H',
  'Case: Corsair Carbide Series SPEC-DELTA RGB',
  'Displays: Samsung 24" 75hz 1ms + LG Flatron 17"',
  'Teclado: Logitech G512',
  'Mouse: Redragon Cobra',
  'Mesa digitalizadora: Wacom CTL472',
  'Headset: Logitech Prodigy G733',
  'Microfone: HyperX QuadCast',
  'Earbuds: Galaxy Buds+',
  'Webcam: Logitech C922 Pro',
];

export const specs: Command = {
  aliases: ['specs', 'spec', 'config', 'pc'],
  exec: async () => {
    sendStriped(specsArr, 'DodgerBlue', 'BlueViolet');
  },
};
