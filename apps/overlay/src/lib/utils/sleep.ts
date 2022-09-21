export const sleep = async (ms: number) =>
  await new Promise((res) => setTimeout(res, ms));
