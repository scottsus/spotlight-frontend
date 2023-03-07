import TicketInfo from '../ticketInfo';
import { seatAlphabetToNumber } from '../seatConversion';

export interface websiteScrape {
  (
    site: string,
    url: string,
    team1: string,
    team2: string,
    text: string
  ): TicketInfo;
}

const fakeTicket = (site: string) => {
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

export const exampleScrape: websiteScrape = (site, url, team1, team2, text) => {
  return fakeTicket('example');
};

// COMPLETE
export const ticketmasterScrape: websiteScrape = (
  site,
  url,
  team1,
  team2,
  text
) => {
  const parts = parseSpacesAndNewlines(text);
  let sIdx = 0,
    rIdx = 0,
    pIdx = 0,
    qIdx = 0;
  while (sIdx < parts.length && parts[sIdx] !== 'Tickets-Sec') {
    sIdx++;
  }
  while (rIdx < parts.length && parts[rIdx] !== 'Row') {
    rIdx++;
  }
  while (pIdx < parts.length && parts[pIdx].charAt(0) !== '$') {
    pIdx++;
  }
  while (qIdx < parts.length && parts[qIdx] !== 'x') {
    qIdx++;
  }

  const getSectionNumber = (subpart: string[]) => {
    const preliminaryRes = parseInt(truncate(subpart[0].replace(/^\D+/g, '')));
    if (preliminaryRes) return preliminaryRes;
    return parseInt(truncate(subpart[1].replace(/^\D+/g, '')));
  };

  const sectionNumber = getSectionNumber(parts.slice(sIdx + 1, sIdx + 3));
  const rowNumber = seatAlphabetToNumber(parts[rIdx + 1].replace(/[,]/g, ''));
  const totalPrice = parseFloat(truncate(parts[pIdx].substring(1)));
  const quantity = parseInt(parts[qIdx + 1]);

  const dots = text.split(' • ');
  const firstDotParts = dots[0].split('\n');
  const day = firstDotParts[firstDotParts.length - 1];
  const date = dots[1];
  const setting = dots[2].split('\n');
  const time = setting[0];
  const venue = setting[1];
  const venueParts = venue.split(' - ');
  const stadium = venueParts[0];
  const cityState = venueParts[1].split(', ');
  const city = cityState[0];
  const state = cityState[1];

  const ticketInfo = new TicketInfo(
    team1,
    team2,
    [],
    quantity,
    {
      section: sectionNumber.toString(),
      row: rowNumber.toString(),
    },
    {
      totalPrice: totalPrice,
      quantity: quantity,
      basePrice: totalPrice / quantity,
      serviceFee: 0,
      deliveryFee: 5,
    },
    {
      stadium: stadium,
      city: city,
      state: state,
    },
    {
      date: date,
      day: day,
      hour: time,
    },
    site,
    url
  );

  // check(ticketInfo);
  return ticketInfo;
};

// COMPLETE
export const seatgeekScrape: websiteScrape = (
  site,
  url,
  team1,
  team2,
  text
) => {
  const parts = parseSpacesAndNewlines(text);
  let sIdx = 0,
    rIdx = 0,
    pIdx = 0,
    dollarSignCount = 0;
  while (sIdx < parts.length && parts[sIdx] !== 'Section') {
    sIdx++;
  }
  while (rIdx < parts.length && parts[rIdx] !== 'Row') {
    rIdx++;
  }
  while (pIdx < parts.length && dollarSignCount < 2) {
    pIdx++;
    if (parts[pIdx].charAt(0) === '$') dollarSignCount++;
  }
  const sectionNumber = parseInt(truncate(parts[sIdx + 1]));
  const rowNumber = parseInt(truncate(parts[rIdx + 1]));
  const totalPrice = parseFloat(truncate(parts[pIdx].substring(1)));
  const quantity = parseInt(parts[pIdx + 2]);

  const newlineParts = text.split('\n');
  let idx = 0;
  for (const part of newlineParts) {
    if (part === 'Continue to Review') break;
    idx++;
  }
  idx += 4;
  const setting = newlineParts[idx];
  const settingParts = setting.split(' ');
  const day = settingParts[0];
  const date = settingParts[1] + ' ' + settingParts[2];
  const time = settingParts[4];
  idx += 2;
  const venue = newlineParts[idx];
  const commaParts = venue.split(', ');
  const stadium = commaParts[0];
  const city = commaParts[1];
  const state = commaParts[2];

  const ticketInfo = new TicketInfo(
    team1,
    team2,
    [],
    quantity,
    {
      section: sectionNumber.toString(),
      row: rowNumber.toString(),
    },
    {
      totalPrice: totalPrice,
      quantity: quantity,
      basePrice: totalPrice / quantity,
      serviceFee: 0,
      deliveryFee: 5,
    },
    {
      stadium: stadium,
      city: city,
      state: state,
    },
    {
      date: date,
      day: day,
      hour: time,
    },
    site,
    url
  );

  // check(ticketInfo);
  return ticketInfo;
};

// problem: need lots of steps to extract price
export const stubhubScrape: websiteScrape = (site, url, team1, team2, text) => {
  const parts = parseSpacesAndNewlines(text);
  console.log(`Parts: ${parts}`);
  let sIdx = 0,
    rIdx = 0,
    pIdx = 0;
  while (sIdx < parts.length && parts[sIdx] !== 'Section') {
    sIdx++;
  }
  while (rIdx < parts.length && parts[rIdx] !== 'Row') {
    rIdx++;
  }
  return fakeTicket('stubhub');
};

// problem: even on url match, there's 1 extra step to pick price
export const axsScrape: websiteScrape = (site, url, team1, team2, text) => {
  const parts = parseSpacesAndNewlines(text);
  console.log(`Parts: ${parts}`);
  let sIdx = 0,
    rIdx = 0,
    pIdx = 0;
  while (sIdx < parts.length && parts[sIdx] !== 'Section') {
    sIdx++;
  }
  while (rIdx < parts.length && parts[rIdx] !== 'Row') {
    rIdx++;
  }
  return fakeTicket('axs');
};

// problem: need Beautiful Soup to extract venue info
export const vividseatsScrape: websiteScrape = (
  site,
  url,
  team1,
  team2,
  text
) => {
  const parts = parseSpacesAndNewlines(text);
  console.log(`Parts: ${parts}`);
  let sIdx = 0,
    rIdx = 0,
    pIdx = 0,
    qIdx = 0;
  while (sIdx < parts.length && parts[sIdx] !== 'Section:') {
    sIdx++;
  }
  while (rIdx < parts.length && parts[rIdx] !== 'Row:') {
    rIdx++;
  }
  while (pIdx < parts.length && parts[pIdx] !== 'Price:') {
    pIdx++;
  }
  while (qIdx < parts.length && parts[qIdx] !== 'Quantity:') {
    qIdx++;
  }

  const getSectionNumber = (subpart: string[]) => {
    console.log(`subpart: ${subpart}`);
    for (const sectionNumberString of subpart) {
      const sectionNumber = parseInt(sectionNumberString);
      if (sectionNumber) return sectionNumber;
    }
  };
  const sectionNumber = getSectionNumber(parts.slice(sIdx + 1, sIdx + 4));
  const rowNumber = parseInt(parts[rIdx + 1]);
  const pricePerTicket = parseFloat(parts[pIdx + 1].replace(/[$]/g, ''));
  const quantity = parseInt(parts[qIdx + 1]);
  const totalPrice = pricePerTicket * quantity;
  console.log(
    `Section: ${sectionNumber}, Row: ${rowNumber}, TotalPrice: ${totalPrice}`
  );

  return fakeTicket('vividseats');
};

// problem: need Beautiful Soup to extract venue info
export const tickpickScrape: websiteScrape = (
  site,
  url,
  team1,
  team2,
  text
) => {
  const parts = parseSpacesAndNewlines(text);
  console.log(`Parts: ${parts}`);
  let sIdx = 0,
    rIdx = 0,
    pIdx = 0;
  while (sIdx < parts.length && parts[sIdx] !== 'Section') {
    sIdx++;
  }
  while (rIdx < parts.length && parts[rIdx] !== 'Row') {
    rIdx++;
  }
  return fakeTicket('axs');
};

const parseSpacesAndNewlines = (text: string) => {
  const spaces = text.split(' ');
  const parts: string[] = [];
  for (const space of spaces) {
    const newlines = space.split('\n');
    for (const newline of newlines) if (newline !== '') parts.push(newline);
  }
  return parts;
};

const truncate = (text: string) => {
  const withoutEndline = text.replace('\n', '');
  const withoutSpaces = withoutEndline.replace(' ', '');
  const withoutCommas = withoutSpaces.replace(',', '');
  return withoutCommas;
};

const check = (ticketInfo: TicketInfo) => {
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
