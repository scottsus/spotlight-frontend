import TicketInfo from './TicketInfo';
import {
  websiteScrape,
  seatgeekScrape,
  ticketmasterScrape,
} from './siteCheckoutScrape';
import siteNames from './sitenames';

interface ICheckoutInfo {
  (
    srcSiteURL: string,
    document: string,
    NBATeams: string[],
    teams: React.MutableRefObject<string[]>,
    addTeam: (string) => void,
    addDestTickets: React.Dispatch<React.SetStateAction<TicketInfo[]>>,
    setSrcTicketInfo: React.Dispatch<React.SetStateAction<TicketInfo>>,
    setHasLoadedOne: React.Dispatch<React.SetStateAction<boolean>>,
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
  setHasLoadedOne,
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
          findTicketsFromSite(
            siteName,
            srcTicketInfo,
            addDestTickets,
            sitesDone,
            setHasLoadedOne,
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
    setHasLoadedOne: React.Dispatch<React.SetStateAction<boolean>>,
    setHasLoadedAll: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
}

const findTicketsFromSite: IFindTicketsFromSite = (
  site,
  srcTicketInfo,
  addDestTickets,
  sitesDone,
  setHasLoadedOne,
  setHasLoadedAll
) => {
  // const srcSiteURL = `http://localhost:6969/scrape/${site}`;
  const srcSiteURL = `https://spotlight-backend.vercel.app/api/scrape/${site}`;
  fetch(srcSiteURL, {
    headers: {
      team1: srcTicketInfo.team1,
      team2: srcTicketInfo.team2,
      section: srcTicketInfo.section,
      row: srcTicketInfo.row,
      totalPrice: srcTicketInfo.totalPrice,
      quantity: srcTicketInfo.quantity,
      day: srcTicketInfo.day,
      date: srcTicketInfo.date,
      time: srcTicketInfo.time,
      stadium: srcTicketInfo.stadium,
      city: srcTicketInfo.city,
      state: srcTicketInfo.state,
    },
  })
    .then((res) => res.json())
    .then((resJSONArray) => {
      for (const [_, resJSON] of resJSONArray.entries()) {
        const newTicket: TicketInfo = {
          team1: srcTicketInfo.team1,
          team2: srcTicketInfo.team2,
          section: resJSON['section'],
          row: resJSON['row'],
          totalPrice: resJSON['totalPrice'],
          quantity: srcTicketInfo.quantity,
          day: srcTicketInfo.day,
          date: srcTicketInfo.date,
          time: srcTicketInfo.time,
          stadium: srcTicketInfo.stadium,
          city: srcTicketInfo.city,
          state: srcTicketInfo.state,
          url: resJSON['url'],
          site: resJSON['name'],
        };
        addDestTickets((destTickets) => [...destTickets, newTicket]);
        sitesDone.add(resJSON['name']);
        if (resJSONArray.length !== 0) setHasLoadedOne(true);
      }
    })
    .catch((err) => {
      console.log('Error:', err);
    })
    .finally(() => {
      if (sitesDone.size === siteNames.length) setHasLoadedAll(true);
    });
};

const getNameFromURL = (url: string) => {
  for (const siteName of siteNames) {
    if (url.includes(siteName)) return siteName;
  }
  return '';
};

const siteMap = {
  seatgeek: seatgeekScrape,
  ticketmaster: ticketmasterScrape,
};

export default findSportsTickets;
