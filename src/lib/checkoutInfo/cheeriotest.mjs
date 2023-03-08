import { load } from "cheerio"

const outerHtml = `

`

const extractAndTrim = (targetString, delimiter) => {
    const parts = targetString.split(delimiter);
    const res = [];
    for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.length > 0) res.push(trimmed);
    }
    return res;
};

const $ = load(outerHtml)

const quantityDiv = findDiv($, 'ADMIT');
const sectionDiv = findDiv($, 'Section');
const rowDiv = findDiv($, 'Row');
const yearDiv = findDiv($, '2023');
const venueDiv = $(`[class*='event-venue-label']`);
const basePriceDiv = findDiv($, 'Ticket Price');
const serviceFeeDiv = findDiv($, 'Fulfillment and Service Fee');
const totalPriceDiv = $(`[class*='total-price-value']`);

const quantity = quantityDiv.next().text();
const section = sectionDiv.first().next().text();
const row = rowDiv.first().next().text();
const venue = venueDiv.text();
const date = yearDiv.parent().text();
const dayHour = venueDiv.parent().prev();
const basePrice = basePriceDiv.next().text();
const serviceFee = serviceFeeDiv.next().text();
const totalPrice = totalPriceDiv.text();

const checkItems = () => {
    console.log(`Quantity:`, quantity);
    console.log(`Section:`, section);
    console.log(`Row:`, row);
    console.log(`Venue:`, venue);
    console.log(`Date:`, date);
    console.log(`Day/Hour:`, dayHour);
    console.log(`Base Price:`, basePrice);
    console.log(`Service Fee:`, serviceFee);
    console.log(`Total Price:`, totalPrice);
}

checkItems();



// const sectionDiv = $(`[class='ticket-section']`).text();
// const rowDiv = $(`[class='ticket-row']`).text();
// const totalPriceDiv = $(`[id='totalCharge']`).text();
// const basePriceDiv = $(`[class='price-per-ticket']`).text();
// const serviceFeeDiv = $(`[id='totalCharge']`).text();
// const deliveryFeeDiv = $(`[id='deliveryFee']`).text();
// const dateTimeDiv = $(`[class='production-date']`).text();
// const venueDiv = $(`[class='production-venue']`).text();

// // const performersArr = extractAndTrim(eventDiv, 'at');
// const quantityArr = extractAndTrim(quantityDiv, ' ');
// const sectionArr = extractAndTrim(sectionDiv, ' ');
// const rowArr = extractAndTrim(rowDiv, ' ');
// const totalPriceArr = extractAndTrim(totalPriceDiv, '$');
// const basePriceArr = extractAndTrim(basePriceDiv, '$');
// const serviceFeeArr = extractAndTrim(serviceFeeDiv, '$');
// const deliveryFeeArr = extractAndTrim(deliveryFeeDiv, '$');
// const dateTimeArr = extractAndTrim(dateTimeDiv, ' ');
// const venueArr = extractAndTrim(venueDiv, '-');

// const checkArrays = () => {
//     // console.log(`Event:`, performersArr);
//     console.log(`Quantity:`, quantityArr);
//     console.log(`Section:`, sectionArr);
//     console.log(`Row:`, rowArr);
//     console.log(`Total Price:`, totalPriceArr);
//     console.log(`Base Price:`, basePriceArr);
//     console.log(`Service:`, serviceFeeArr);
//     console.log(`Delivery:`, deliveryFeeArr);
//     console.log(`Date & Time:`, dateTimeArr);
//     console.log(`Venue:`, venueArr);
// };

// checkArrays();








