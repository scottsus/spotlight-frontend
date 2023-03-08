import { load } from 'cheerio';
import TicketInfo from '../TicketInfo';
import { checkoutScrape, check, extractAndTrim } from './utils';

const vividseats: checkoutScrape = (site, url, team1, team2, outerHtml) => {
  const $ = load(outerHtml);

  const eventDiv = $(`[class='productionName']`).text();
  const quantityDiv = $(`[id='checkoutQuantity']`).text();
  const sectionDiv = $(`[class='ticket-section']`).text();
  const rowDiv = $(`[class='ticket-row']`).text();
  const totalPriceDiv = $(`[id='totalCharge']`).text();
  const basePriceDiv = $(`[class='price-per-ticket']`).text();
  const serviceFeeDiv = $(`[id='totalCharge']`).text();
  const deliveryFeeDiv = $(`[id='deliveryFee']`).text();
  const dateTimeDiv = $(`[class='production-date']`).text();
  const venueDiv = $(`[class='production-venue']`).text();

  const performersArr = extractAndTrim(eventDiv, 'at');
  const quantityArr = extractAndTrim(quantityDiv, ' ');
  const sectionArr = extractAndTrim(sectionDiv, ' ');
  const rowArr = extractAndTrim(rowDiv, ' ');
  const totalPriceArr = extractAndTrim(totalPriceDiv, '$');
  const basePriceArr = extractAndTrim(basePriceDiv, '$');
  const serviceFeeArr = extractAndTrim(serviceFeeDiv, '$');
  const deliveryFeeArr = extractAndTrim(deliveryFeeDiv, '$');
  const dateTimeArr = extractAndTrim(dateTimeDiv, ' ');
  const venueArr = extractAndTrim(venueDiv, '-');

  const checkArrays = () => {
    console.log(`Event:`, performersArr);
    console.log(`Quantity:`, quantityArr);
    console.log(`Section:`, sectionArr);
    console.log(`Row:`, rowArr);
    console.log(`Total Price:`, totalPriceArr);
    console.log(`Base Price:`, basePriceArr);
    console.log(`Service:`, serviceFeeArr);
    console.log(`Delivery:`, deliveryFeeArr);
    console.log(`Date & Time:`, dateTimeArr);
    console.log(`Venue:`, venueArr);
  };

  const quantity = parseInt(quantityArr[0]);
  const cityState = venueArr[1].split(', ');
  const date = `${dateTimeArr[1]} ${dateTimeArr[2]} ${dateTimeArr[3]}`;
  const hour = `${dateTimeArr[4]} ${dateTimeArr[5]}`;

  const ticketInfo = new TicketInfo(
    team1,
    team2,
    [],
    quantity,
    {
      section: sectionArr[sectionArr.length - 1],
      row: rowArr[0],
    },
    {
      totalPrice: parseFloat(totalPriceArr[0]),
      basePrice: parseFloat(basePriceArr[0]),
      quantity: quantity,
      serviceFee: parseFloat(serviceFeeArr[0]),
      deliveryFee: parseFloat(deliveryFeeArr[0]),
    },
    {
      stadium: venueArr[0],
      city: cityState[0],
      state: cityState[1],
    },
    {
      day: dateTimeArr[0],
      date: date,
      hour: hour,
    },
    site,
    url
  );

  // check(ticketInfo);
  return ticketInfo;
};

export default vividseats;
