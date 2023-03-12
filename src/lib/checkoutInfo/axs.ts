import { checkoutScrape, fakeTicket } from './utils';

const axsScrape: checkoutScrape = (site, url, text) => {
  return fakeTicket('axs');
};
export default axsScrape;
