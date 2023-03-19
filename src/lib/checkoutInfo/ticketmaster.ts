import { load } from 'cheerio';
import TicketInfo from '../types/ticketInfo';
import { checkoutScrape, check, extractAndTrim } from './utils';

const ticketmasterScrape: checkoutScrape = (site, url, outerHtml) => {
  const $ = load(outerHtml);

  const eventDiv = $(`[data-tid='event-name']`).text();
  const quantityDiv = $(`[data-tid='ticket-info']`).text();
  const seatDiv = $(`[data-tid='seat-info']`).text();
  const totalPriceDiv = $(`[data-tid='header-button']`).text();
  const basePriceDiv = $(`[data-tid='summary-quantity-type']`).text();
  const serviceFeeDiv = $(`[data-tid='service-fee-price']`).text();
  const deliveryFeeDiv = $(`[data-tid='order-processing-fee-price']`).text();
  const dateTimeDiv = $(`[data-tid='event-datetime']`).text();
  const venueDiv = $(`[data-tid='event-venue']`).text();

  const actorsArr = extractAndTrim(eventDiv, 'vs.');
  const quantityArr = extractAndTrim(quantityDiv, ' ');
  const seatArr = extractAndTrim(seatDiv, ',');
  const totalPriceArr = extractAndTrim(totalPriceDiv, '$');
  const basePriceArr = extractAndTrim(basePriceDiv, '$');
  const serviceFeeArr = extractAndTrim(serviceFeeDiv, '$');
  const deliveryFeeArr = extractAndTrim(deliveryFeeDiv, '$');
  const dateTimeArr = extractAndTrim(dateTimeDiv, '•');
  const venueArr = extractAndTrim(venueDiv, ',');

  const checkArrays = () => {
    console.log(`Event:`, actorsArr);
    console.log(`Quantity:`, quantityArr);
    console.log(`Seat:`, seatArr);
    console.log(`Total Price:`, totalPriceArr);
    console.log(`Base Price:`, basePriceArr);
    console.log(`Service:`, serviceFeeArr);
    console.log(`Delivery:`, deliveryFeeArr);
    console.log(`Date & Time:`, dateTimeArr);
    console.log(`Venue:`, venueArr);
  };

  const quantity = parseInt(quantityArr[0]);
  const basePrice = parseFloat(basePriceArr[1].split('x')[0]);
  const stadiumCity = venueArr[0].split(' - ');

  const ticketInfo = new TicketInfo(
    actorsArr[0],
    actorsArr.length > 1 ? actorsArr[1] : '',
    quantity,
    {
      section: seatArr[0],
      row: seatArr[1],
    },
    {
      totalPrice: parseFloat(totalPriceArr[1].replace(`,`, ``)),
      basePrice: basePrice,
      quantity: quantity,
      serviceFee: parseFloat(serviceFeeArr[0]),
      deliveryFee: parseFloat(deliveryFeeArr[0]),
    },
    {
      stadium: stadiumCity[0],
      city: stadiumCity[1],
      state: venueArr[1],
    },
    {
      day: dateTimeArr[0],
      date: dateTimeArr[1],
      hour: dateTimeArr[2],
    },
    site,
    url
  );

  check(ticketInfo);
  return ticketInfo;
};

export default ticketmasterScrape;
