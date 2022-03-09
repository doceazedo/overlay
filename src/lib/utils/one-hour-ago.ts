export const hasPassedAnHour = (date: Date) => {
  const now = Date.now();
  const time = date.getTime();
  const twoHours = 1000 * 60 * 60;

  return now - time > twoHours;
};
