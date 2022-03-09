import simpleIcons from 'simple-icons';
import tinycolor from 'tinycolor2';

export const getTeam = (team?: string) => {
  if (!team) return;
  const icon = simpleIcons.Get(team);
  icon.hex = tinycolor(`#${icon.hex}`).getBrightness() > 50 ? icon.hex : 'fff';
  return icon;
};
