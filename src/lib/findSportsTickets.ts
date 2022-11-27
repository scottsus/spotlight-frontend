import { ICollapsible } from '../components/Collapsible/Collapsible';
import { websiteScrape, seatgeekScrape, ticketmasterScrape } from './siteCheckoutScrape';

export const siteNames = [
  'seatgeek',
  'stubhub',
  'ticketmaster',
  'tickpick'
]

var numSitesDone = 0;
// const numTotalSites = siteNames.length;
const numTotalSites = 1;

interface ICheckoutInfo {
  ( siteURL:string,
    document:string, 
    NBATeams:string[], 
    teams:React.MutableRefObject<string[]>, 
    addTeam:(string)=>void, 
    addTickets:React.Dispatch<React.SetStateAction<ICollapsible[]>>,
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>> ) : void
}

const findSportsTickets:ICheckoutInfo = (siteURL, document, NBATeams, teams, addTeam, addTickets, setIsLoading) => {
  const truncatedDocText:string = document;
  for (const NBATeam of NBATeams) {
    if (truncatedDocText.includes(NBATeam)) {
      addTeam(NBATeam);
      if (teams.current.length == 2) {
        const siteName = getNameFromURL(siteURL);
        const scrapingFunction:websiteScrape = siteMap[siteName];
        const ticketInfo:string[] = scrapingFunction(truncatedDocText);
        for (const site of siteNames) {
          if (site !== 'stubhub') continue
          findTicketsFromSite(site, 
            teams.current[0],
            teams.current[1],
            ticketInfo[0],
            ticketInfo[1],
            ticketInfo[2],
            ticketInfo[3],
            addTickets,
            setIsLoading);
        }
        break;
      }
    }
  }
}

interface IFindTicketsFromSite {
  ( site:string,
    team1:string,
    team2:string,
    section:string,
    row:string,
    price:string,
    quantity:string,
    addTickets:React.Dispatch<React.SetStateAction<ICollapsible[]>>,
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>> ) : void
}

const findTicketsFromSite:IFindTicketsFromSite = (site, team1, team2, section, row, price, quantity, addTickets, setIsLoading) => {
  const siteURL = `http://localhost:6969/scrape/${site}`;
  fetch(siteURL, {
    headers: {
      team1: team1,
      team2: team2,
      section: section,
      row: row,
      price: price,
      quantity: quantity,
    },
  })
  .then((res) => res.json())
  .then(ticketList => {
    for (const [_, ticket] of ticketList.entries()) {
      const newTicket = {
        logo: ticket['name'],
        section: ticket['section'],
        row: ticket['row'],
        price: ticket['price'],
        url: ticket['url'],
      };
      addTickets((tickets) => [...tickets, newTicket]);
    }
  })
  .catch((err) => {
    console.log('Error:', err);
  })
  .finally(() => {
    numSitesDone++;
    if (numSitesDone === numTotalSites)
      setIsLoading(false);
  });
}

const getNameFromURL = (url:string) => {
  for (const siteName of siteNames) {
      if (url.includes(siteName))
          return siteName;
  }
  return "";
}

const siteMap = {
  'seatgeek': seatgeekScrape,
  'ticketmaster': ticketmasterScrape,
}


export default findSportsTickets;