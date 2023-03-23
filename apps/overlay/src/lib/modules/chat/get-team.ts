import * as simpleIcons from 'simple-icons';
import tinycolor from 'tinycolor2';

const iconsMap = new Map(Object.entries(simpleIcons).map(([_, icon]) => [icon.slug, icon]));

export const getTeam = (team?: string) => {
  if (!team) return;

  const icon = iconsMap.get(team);
  if (!icon) return;

  icon.hex = tinycolor(`#${icon.hex}`).getBrightness() > 50 ? icon.hex : 'fff';
  return icon;
};
