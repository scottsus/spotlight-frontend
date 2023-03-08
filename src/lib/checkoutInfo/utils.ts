import { CheerioAPI } from 'cheerio';
import TicketInfo from '../types/ticketInfo';

export interface checkoutScrape {
  (
    site: string,
    url: string,
    team1: string,
    team2: string,
    text: string
  ): TicketInfo;
}

export const fakeTicket = (site: string) => {
  return {
    team1: 'Los Angeles Lakers',
    team2: 'Toronto Raptors',
    performers: [],
    quantity: 2,
    seatInfo: {
      section: 'Sec 301',
      row: 'Row 10',
    },
    priceInfo: {
      totalPrice: 1000,
      quantity: 2,
      basePrice: 500,
      serviceFee: 200,
      deliveryFee: 5,
    },
    venueInfo: {
      stadium: 'Crypto.com Arena',
      city: 'Los Angeles',
      state: 'CA',
    },
    timeInfo: {
      day: 'Thursday',
      date: 'Mar 30',
      hour: '9:00pm',
    },
    site: site,
    url: 'https://scottsus.xyz',
  };
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
  console.log('Team 1:', ticketInfo.team1);
  console.log('Team 2:', ticketInfo.team2);
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
