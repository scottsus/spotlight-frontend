import { load } from 'cheerio';
import { isStanding } from '../constants/classifySeat';
import TicketInfo from '../types/ticketInfo';
import { checkoutScrape, check, findDiv, isNumber } from './utils';

const tickpickScrape: checkoutScrape = (site, url, outerHtml) => {
  const $ = load(outerHtml);

  const eventDateDiv = $(`[class*='eventDate']`);
  const titleDiv = eventDateDiv.prev();
  const eventLocationParentDiv = eventDateDiv.next();
  const sectionDiv = findDiv($, `Section`, `h4`, false);
  const rowDiv = findDiv($, `Row`, `b`, false);
  const quantityDiv = findDiv($, `Quantity`, `dt`);
  const basePriceDiv = findDiv($, `Price`, `dt`);
  const totalPriceDiv = $(`[class='total']`);

  const actorsArr = titleDiv.text().split(' vs. ');
  const actor1 = actorsArr[0];
  const actor2 = actorsArr.length > 1 ? actorsArr[1] : '';
  const quantity = parseInt(quantityDiv.next().text().split(' ')[1]);

  const sectionParts = sectionDiv.text().split(' ');
  let section: string;
  if (isNumber(sectionParts[1])) section = sectionParts[1];
  else section = `${sectionParts[1]} ${sectionParts[2]}`;
  const row = rowDiv.text().split(' ')[1];
  const isAssigned = !isStanding(section);

  const locationDiv = eventLocationParentDiv.children().eq(1);
  const cityState = locationDiv.children().eq(0).text();
  const stadium = locationDiv.text().replace(cityState, '');
  const city = cityState.split(', ')[0];
  const state = cityState.split(', ')[1];

  const eventDateArr = eventDateDiv.text().split(', ');
  const day = eventDateArr[0];
  const date = eventDateArr[1];
  const hour = eventDateArr[2];
  const basePrice = parseFloat(
    basePriceDiv.next().text().trim().match(/\d+/)[0]
  );
  const totalPrice = parseFloat(totalPriceDiv.text().trim().match(/\d+/)[0]);

  const checkItems = () => {
    console.log(`Title:`, actorsArr);
    console.log(`Quantity:`, quantityDiv);
    console.log(`Section:`, section);
    console.log(`Row:`, row);
    console.log(`Stadium:`, stadium);
    console.log(`City:`, city);
    console.log(`State:`, state);
    console.log(`Day:`, day);
    console.log(`Date:`, date);
    console.log(`Hour:`, hour);
    console.log(`Base Price:`, basePriceDiv);
    console.log(`Total Price:`, totalPriceDiv);
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
      totalPrice: totalPrice,
      basePrice: basePrice,
      quantity: quantity,
      serviceFee: 0,
      deliveryFee: 0,
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

  check(ticketInfo);
  return ticketInfo;
};

export default tickpickScrape;
