import TicketInfo from './ticketInfo';

export interface websiteScrape {
  (
    site: string,
    url: string,
    team1: string,
    team2: string,
    text: string
  ): TicketInfo;
}

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
  const sectionNumber = truncate(parts[sIdx + 1]);
  const rowNumber = truncate(parts[rIdx + 1]);
  const totalPrice = truncate(parts[pIdx].substring(1));
  const quantity = parts[pIdx + 2];

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
    sectionNumber,
    rowNumber,
    totalPrice,
    quantity,
    day,
    date,
    time,
    stadium,
    city,
    state,
    site,
    url
  );

  check(ticketInfo);
  return ticketInfo;
};

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
  const sectionNumber = truncate(parts[sIdx + 1]);
  const rowNumber = truncate(parts[rIdx + 1]);
  const totalPrice = truncate(parts[pIdx].substring(1));
  const quantity = parts[qIdx + 1];

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
    sectionNumber,
    rowNumber,
    totalPrice,
    quantity,
    day,
    date,
    time,
    stadium,
    city,
    state,
    site,
    url
  );

  check(ticketInfo);
  return ticketInfo;
};

const parseSpacesAndNewlines = (text: string) => {
  const spaces = text.split(' ');
  let parts = [];
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
  console.log('Section:', ticketInfo.section);
  console.log('Row:', ticketInfo.row);
  console.log('Price:', ticketInfo.totalPrice);
  console.log('Quantity:', ticketInfo.quantity);
  console.log('Day:', ticketInfo.day);
  console.log('Date:', ticketInfo.date);
  console.log('Time:', ticketInfo.time);
  console.log('Stadium:', ticketInfo.stadium);
  console.log('City:', ticketInfo.city);
  console.log('State:', ticketInfo.state);
  console.log('Site:', ticketInfo.site);
  console.log('URL:', ticketInfo.url);
};
