import { browser } from '$app/env';

export default function GET (param) {
  if (!browser) return;

  let result = null, tmp = [];
  location.search
    .substr(1)
    .split('&')
    .forEach(item => {
      tmp = item.split('=');
      if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
    });
  return result;
}