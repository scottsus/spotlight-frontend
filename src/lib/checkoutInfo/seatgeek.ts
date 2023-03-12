import { load } from 'cheerio';
import TicketInfo from '../types/ticketInfo';
import { checkoutScrape, extractAndTrim, extractPriceFromStr } from './utils';

const seatgeekScrape: checkoutScrape = (site, url, outerHtml) => {
  const $ = load(outerHtml);
  const titleDiv = $(`[data-test='event-title']`).text();
  const seatDiv = $(`[data-test='listing-section-title']`).text();
  const dateTimeDiv = $(`[data-test='event-datetime']`).text();
  const locationDiv = $(`[data-test='event-location']`).text();
  const basePriceDiv = $(`[data-test='line-item'][data-role='item']`).text();
  const serviceFeesDiv = $(`[data-test='line-item'][data-role='fees']`).text();
  const totalPriceDiv = $(`[data-test='line-item'][data-role='total']`).text();

  const actorsArr = extractAndTrim(titleDiv, 'at');
  const seatArr = extractAndTrim(seatDiv, ',');
  const dateTimeArr = extractAndTrim(dateTimeDiv, 'at');
  const locationArr = extractAndTrim(locationDiv, ',');
  const basePriceArr = extractAndTrim(basePriceDiv, ' ');
  const servicesFeesArr = extractAndTrim(serviceFeesDiv, ' ');
  const totalPriceArr = extractAndTrim(totalPriceDiv, '$');

  const checkArrays = () => {
    console.log(`Actors:`, actorsArr);
    console.log(`Seat:`, seatArr);
    console.log(`Date & Time:`, dateTimeArr);
    console.log(`Location:`, locationArr);
    console.log(`Base Price:`, basePriceArr);
    console.log(`Service Fees:`, servicesFeesArr);
    console.log(`Total Price:`, totalPriceArr);
  };

  checkArrays();

  const quantity = parseInt(basePriceArr[2]);

  const dateParts = dateTimeArr[0].split(' ');
  const day = dateParts[0];
  const date = `${dateParts[1]} ${dateParts[2]}`;

  const ticketInfo = new TicketInfo(
    actorsArr[0],
    actorsArr.length > 1 ? actorsArr[1] : '',
    quantity,
    {
      section: seatArr[0],
      row: seatArr[1],
    },
    {
      totalPrice: parseFloat(totalPriceArr[1]),
      quantity: quantity,
      basePrice: extractPriceFromStr(basePriceArr[0]),
      serviceFee: extractPriceFromStr(servicesFeesArr[0]),
      deliveryFee: 5,
    },
    {
      stadium: locationArr[0],
      city: locationArr[1],
      state: locationArr[2],
    },
    {
      day: day,
      date: date,
      hour: dateTimeArr[1],
    },
    site,
    url
  );

  // check(ticketInfo);
  return ticketInfo;
};

export default seatgeekScrape;
