import { CheerioAPI } from 'cheerio';
import TicketInfo from '../types/ticketInfo';

import axsScrape from './axs';
import exampleScrape from './example';
import seatgeekScrape from './seatgeek';
import stubhubScrape from './stubhub';
import ticketmasterScrape from './ticketmaster';
import tickpickScrape from './tickpick';
import vividseatsScrape from './vividseats';

export const siteMap = {
  axs: axsScrape,
  example: exampleScrape,
  seatgeek: seatgeekScrape,
  stubhub: stubhubScrape,
  ticketmaster: ticketmasterScrape,
  tickpick: tickpickScrape,
  vividseats: vividseatsScrape,
};

export interface checkoutScrape {
  (srcSite: string, srcUrl: string, outerHtml: string): TicketInfo;
}

export const fakeTicket = (site: string) => {
  return new TicketInfo(
    'Los Angeles Lakers',
    'Toronto Raptors',
    2,
    {
      section: 'Sec 301',
      row: 'Row 10',
    },
    {
      totalPrice: 1000,
      quantity: 2,
      basePrice: 500,
      serviceFee: 200,
      deliveryFee: 5,
    },
    {
      stadium: 'Crypto.com Arena',
      city: 'Los Angeles',
      state: 'CA',
    },
    {
      day: 'Thursday',
      date: 'Mar 30',
      hour: '9:00pm',
    },
    site,
    'https://scottsus.xyz'
  );
};

export const extractAndTrim = (targetString: string, delimiter: string) => {
  const parts = targetString.split(delimiter);
  const res: string[] = [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.length > 0) res.push(trimmed);
  }
  return res;
};

export const extractPriceFromStr = (targetString: string) => {
  const match = targetString.match(/\d+\.\d+/);
  return match ? parseFloat(match[0]) : NaN;
};

export const findDiv = (
  $: CheerioAPI,
  targetString: string,
  htmlTag = `div`,
  strictEquality = true
) => {
  return $(htmlTag).filter(function () {
    if (strictEquality) return $(this).text().trim() === targetString;
    return $(this).text().trim().includes(targetString);
  });
};

export const isNumber = (str: string) => {
  if (isNaN(Number(str))) return false;
  return true;
};

export const check = (ticketInfo: TicketInfo) => {
  console.log('Actor 1:', ticketInfo.actor1);
  console.log('Actor 2:', ticketInfo.actor2);
  console.log('Section:', ticketInfo.seatInfo.section);
  console.log('Row:', ticketInfo.seatInfo.row);
  console.log('Price:', ticketInfo.priceInfo.totalPrice);
  console.log('Quantity:', ticketInfo.quantity);
  console.log('Date:', ticketInfo.timeInfo.date);
  console.log('Day:', ticketInfo.timeInfo.day);
  console.log('Time:', ticketInfo.timeInfo.hour);
  console.log('Stadium:', ticketInfo.venueInfo.stadium);
  console.log('City:', ticketInfo.venueInfo.city);
  console.log('State:', ticketInfo.venueInfo.state);
  console.log('Site:', ticketInfo.site);
  console.log('URL:', ticketInfo.url);
};
