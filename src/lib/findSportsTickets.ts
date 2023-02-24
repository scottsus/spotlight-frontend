import TicketInfo from './TicketInfo';
import {
  websiteScrape,
  exampleScrape,
  ticketmasterScrape,
  seatgeekScrape,
  stubhubScrape,
  axsScrape,
  vividseatsScrape,
  tickpickScrape,
} from './siteCheckoutScrape';
import siteNames from './sitenames';
import { BASE_URL, TEST_URL } from './urls';

interface ICheckoutInfo {
  (
    srcSiteURL: string,
    document: string,
    NBATeams: string[],
    teams: React.MutableRefObject<string[]>,
    addTeam: (string) => void,
    addDestTickets: React.Dispatch<React.SetStateAction<TicketInfo[]>>,
    setSrcTicketInfo: React.Dispatch<React.SetStateAction<TicketInfo>>,
    setHasOneGoodResult: React.Dispatch<React.SetStateAction<boolean>>,
    setHasLoadedAll: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
}

const findSportsTickets: ICheckoutInfo = (
  srcSiteURL,
  document,
  NBATeams,
  teams,
  addTeam,
  addDestTickets,
  setSrcTicketInfo,
  setHasOneGoodResult,
  setHasLoadedAll
) => {
  const truncatedDocText: string = document;
  for (const NBATeam of NBATeams) {
    if (truncatedDocText.includes(NBATeam)) {
      addTeam(NBATeam);
      if (teams.current.length == 2) {
        const srcSite = getNameFromURL(srcSiteURL);
        const scrapingFunction: websiteScrape = siteMap[srcSite];
        const srcTicketInfo: TicketInfo = scrapingFunction(
          srcSite,
          srcSiteURL,
          teams.current[0],
          teams.current[1],
          truncatedDocText
        );
        setSrcTicketInfo(srcTicketInfo);

        const sitesDone = new Set<string>();
        for (const siteName of siteNames) {
          if (siteName !== 'example')
            findTicketsFromSite(
              siteName,
              srcTicketInfo,
              addDestTickets,
              sitesDone,
              setHasOneGoodResult,
              setHasLoadedAll
            );
        }
        break;
      }
    }
  }
};

interface IFindTicketsFromSite {
  (
    siteName: string,
    srcTicketInfo: TicketInfo,
    addDestTickets: React.Dispatch<React.SetStateAction<TicketInfo[]>>,
    sitesDone: Set<string>,
    setHasOneGoodResult: React.Dispatch<React.SetStateAction<boolean>>,
    setHasLoadedAll: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
}

const findTicketsFromSite: IFindTicketsFromSite = (
  site,
  srcTicketInfo,
  addDestTickets,
  sitesDone,
  setHasOneGoodResult,
  setHasLoadedAll
) => {
  const srcSiteURL = `${BASE_URL}/${site}`;
  const reqHeaders = {
    /* Required Info */
    team1: srcTicketInfo.team1,
    team2: srcTicketInfo.team2,
    srcSection: srcTicketInfo.seatInfo.section,
    srcRow: srcTicketInfo.seatInfo.row,
    srcTotalPrice: srcTicketInfo.priceInfo.totalPrice.toString(),
    quantity: srcTicketInfo.quantity.toString(),

    /* Unused for now */
    // day: srcTicketInfo.timeInfo.day,
    // date: srcTicketInfo.timeInfo.date,
    // hour: srcTicketInfo.timeInfo.hour,
    // stadium: srcTicketInfo.venueInfo.stadium,
    // city: srcTicketInfo.venueInfo.city,
    // state: srcTicketInfo.venueInfo.state,
  };
  fetch(srcSiteURL, {
    headers: reqHeaders,
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`non-200 status code`);
    })
    .then((resJSONArray) => {
      for (const [_, resJSON] of resJSONArray.entries()) {
        const newTicket: TicketInfo = {
          team1: srcTicketInfo.team1,
          team2: srcTicketInfo.team2,
          performers: srcTicketInfo.performers,
          quantity: resJSON['quantity'],
          seatInfo: {
            section: resJSON['seatInfo']['section'],
            row: resJSON['seatInfo']['row'],
          },
          priceInfo: {
            totalPrice: resJSON['priceInfo']['totalPrice'],
            basePrice: resJSON['priceInfo']['basePrice'],
            quantity: resJSON['priceInfo']['quantity'],
            serviceFee: resJSON['priceInfo']['serviceFee'],
            deliveryFee: resJSON['priceInfo']['deliveryFee'],
          },
          venueInfo: srcTicketInfo.venueInfo,
          timeInfo: srcTicketInfo.timeInfo,
          site: resJSON['name'],
          url: resJSON['url'],
        };
        addDestTickets((destTickets) => [...destTickets, newTicket]);
        if (resJSONArray.length !== 0) setHasOneGoodResult(true);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      sitesDone.add(site);
      if (sitesDone.size === siteNames.length - 3) setHasLoadedAll(true);
    });
};

const getNameFromURL = (url: string) => {
  for (const siteName of siteNames) {
    if (url.includes(siteName)) return siteName;
  }
  return '';
};

const siteMap = {
  example: exampleScrape,
  ticketmaster: ticketmasterScrape,
  seatgeek: seatgeekScrape,
  stubhub: stubhubScrape,
  axs: axsScrape,
  vividseats: vividseatsScrape,
  tickpick: tickpickScrape,
};

export default findSportsTickets;
