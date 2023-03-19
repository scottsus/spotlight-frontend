import { load } from 'cheerio';
import TicketInfo from '../types/ticketInfo';
import { checkoutScrape, check, findDiv } from './utils';

const stubhubScrape: checkoutScrape = (site, url, outerHtml) => {
  const $ = load(outerHtml);

  const quantityDiv = findDiv($, 'ADMIT');
  const sectionDiv = findDiv($, 'Section');
  const rowDiv = findDiv($, 'Row');
  const dateDiv = findDiv($, '2023').parent();
  const venueDiv = $(`[class*='event-venue-label']`);
  const basePriceDiv = findDiv($, 'Ticket Price');
  const serviceDiv = findDiv($, 'Fulfillment and Service Fee');
  const totalPriceDiv = $(`[class*='total-price-value']`);

  const quantity = parseInt(quantityDiv.next().text());
  const section = sectionDiv.first().next().text();
  const row = rowDiv.first().next().text();
  const stadium = venueDiv.children().eq(0).text();
  const cityState = venueDiv.children().eq(1).text().split(', ');
  const dateDay = dateDiv.children().eq(0).text();
  const month = dateDiv.children().eq(1).text();
  const year = dateDiv.children().eq(2).text();
  const date = `${dateDay} ${month} ${year}`;
  const dayHourParent = venueDiv.parent().prev();
  const day = dayHourParent.children().eq(0).text();
  const hour = dayHourParent.children().eq(1).text();
  const basePrice = basePriceDiv.next().text().split(' × ')[1].replace('$', '');
  const service = serviceDiv.next().text().split(' × ')[1].replace('$', '');
  const totalPrice = totalPriceDiv.text().replace('$', '');

  const checkItems = () => {
    console.log(`Quantity:`, quantity);
    console.log(`Section:`, section);
    console.log(`Row:`, row);
    console.log(`Stadium:`, stadium);
    console.log(`City:`, cityState[0]);
    console.log(`State:`, cityState[1]);
    console.log(`Date:`, date);
    console.log(`Day:`, day);
    console.log(`Hour:`, hour);
    console.log(`Base Price:`, basePrice);
    console.log(`Service Fee:`, service);
    console.log(`Total Price:`, totalPrice);
  };

  const ticketInfo = new TicketInfo(
    'team1',
    'team2',
    quantity,
    {
      section: section,
      row: row,
    },
    {
      totalPrice: parseFloat(totalPrice),
      basePrice: parseFloat(basePrice),
      quantity: quantity,
      serviceFee: parseFloat(service),
      deliveryFee: 5,
    },
    {
      stadium: stadium,
      city: cityState[0],
      state: cityState[1],
    },
    {
      day: day,
      date: date,
      hour: hour,
    },
    site,
    url
  );

  // check(ticketInfo);
  return ticketInfo;
};

export default stubhubScrape;
