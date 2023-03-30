import { XMLParser } from 'fast-xml-parser';
import { loggr } from '../../utils';

const baseURL = 'https://doceazedo.com';
const parser = new XMLParser();

export const getRSSFeed = async () => {
  try {
    const resp = await fetch(`${baseURL}/feed.xml`);
    const xml = await resp.text();
    const data = parser.parse(xml);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
