import { checkoutScrape, fakeTicket } from './utils';

const exampleScrape: checkoutScrape = (site, url, text) => {
  return fakeTicket('example');
};

export default exampleScrape;
