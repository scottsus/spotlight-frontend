import TicketInfo from './types/ticketInfo';
import findCompetingTickets from './findCompetingTickets';
import siteNames, { getNameFromURL } from './constants/sitenames';
import { siteMap } from './checkoutInfo/utils';

interface ICheckoutInfo {
  (
    srcSiteUrl: string,
    outerHtml: string,
    addDestTickets: React.Dispatch<React.SetStateAction<TicketInfo[]>>,
    setSrcTicketInfo: React.Dispatch<React.SetStateAction<TicketInfo>>,
    setHasOneGoodResult: React.Dispatch<React.SetStateAction<boolean>>,
    setHasLoadedAll: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
}

const processCheckout: ICheckoutInfo = (
  srcSiteUrl,
  outerHtml,
  addDestTickets,
  setSrcTicketInfo,
  setHasOneGoodResult,
  setHasLoadedAll
) => {
  const srcSite = getNameFromURL(srcSiteUrl);
  const getTicketInfo = siteMap[srcSite];

  try {
    const srcTicketInfo = getTicketInfo(srcSite, srcSiteUrl, outerHtml);
    setSrcTicketInfo(srcTicketInfo);

    const sitesDone = new Set<string>();
    for (const siteName of siteNames) {
      if (siteName === 'example') continue;
      findCompetingTickets(
        siteName,
        srcTicketInfo,
        addDestTickets,
        sitesDone,
        setHasOneGoodResult,
        setHasLoadedAll
      );
    }
  } catch (err) {
    console.error(`[READING CHECKOUT]:`, err);
    setHasLoadedAll(true);
  }
};

export default processCheckout;
