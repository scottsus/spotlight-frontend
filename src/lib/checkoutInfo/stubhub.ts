import { load } from 'cheerio';
import TicketInfo from '../types/ticketInfo';
import { checkoutScrape, check, findDiv } from './utils';

const stubhubScrape: checkoutScrape = (site, url, outerHtml) => {
  const $ = load(outerHtml);

  let isAssigned = true;
  const rowDiv = findDiv($, `Row`);
  if (rowDiv.text() === '') isAssigned = false;

  const yourEventDiv = findDiv($, `Your Event`);
  const performerDiv = yourEventDiv
    .next()
    .children()
    .eq(0)
    .children()
    .eq(0)
    .children()
    .eq(0);
  const quantityDiv = findDiv($, 'ADMIT');
  const sectionDiv = findDiv($, 'Section');
  const dateDiv = findDiv($, '2023').parent();
  const venueDiv = $(`[class*='event-venue-label']`);
  const basePriceDiv = findDiv($, 'Ticket Price');

  const getServiceDiv = () => {
    const firstTry = findDiv($, `Service and Fulfillment Fee`);
    if (firstTry.text() !== '') return firstTry;
    return findDiv($, `Fulfillment and Service Fee`);
  };
  const serviceDiv = getServiceDiv();
  const totalPriceDiv = $(`[class*='total-price-value']`);

  const actors = performerDiv.text();
  const actorParts = actors.split(' at ');
  const actor1 = actorParts[0];
  const actor2 = actorParts.length > 1 ? actorParts[1] : '';

  const quantity = parseInt(quantityDiv.next().text());
  const section = sectionDiv.first().next().text();
  const row = rowDiv.first().next().text();

  const stadium = venueDiv.children().eq(0).text();
  const cityState = venueDiv.children().eq(1).text().split(', ');
  const city = cityState[0];
  let state = '';
  if (cityState.length > 1) state = cityState[1];

  const dateDay = dateDiv.children().eq(0).text();
  const month = dateDiv.children().eq(1).text();
  const year = dateDiv.children().eq(2).text();
  const date = `${dateDay} ${month} ${year}`;
  const dayHourParent = venueDiv.parent().prev();
  const day = dayHourParent.children().eq(0).text();
  const hour = dayHourParent.children().eq(1).text();

  let basePrice = '',
    service = '';
  try {
    basePrice = basePriceDiv.next().text().split(' × ')[1].replace('$', '');
    service = serviceDiv.next().text().split(' × ')[1].replace('$', '');
  } catch (err) {
    console.log(err);
  }
  const totalPrice = totalPriceDiv.text().replace('$', '');

  const checkItems = () => {
    console.log(`Actor:`, actors);
    console.log(`Quantity:`, quantity);
    console.log(`Section:`, section);
    console.log(`Row:`, row);
    console.log(`Stadium:`, stadium);
    console.log(`City:`, city);
    console.log(`State:`, state);
    console.log(`Date:`, date);
    console.log(`Day:`, day);
    console.log(`Hour:`, hour);
    console.log(`Base Price:`, basePrice);
    console.log(`Service Fee:`, service);
    console.log(`Total Price:`, totalPrice);
  };

  const ticketInfo = new TicketInfo(
    actor1,
    actor2,
    quantity,
    {
      isAssigned: isAssigned,
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
      city: city,
      state: state,
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
