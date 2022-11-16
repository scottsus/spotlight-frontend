import { ICollapsible } from "../components/Collapsible/Collapsible";
import siteMap, { getNameFromURL } from './siteCheckoutScrape'

interface scrapeInfo {(
  siteURL:string,
  document:string, 
  NBATeams:string[], 
  teams:React.MutableRefObject<string[]>, 
  addTeam:(string)=>void, 
  data:ICollapsible[], 
  addData:React.Dispatch<React.SetStateAction<ICollapsible[]>>, 
  setLoader:React.Dispatch<React.SetStateAction<boolean>>):void
}

const findSportsTickets:scrapeInfo = (siteURL, document, NBATeams, teams, addTeam, data, addData, setLoader) => {
  const truncatedDocText: string = document;
  for (const NBATeam of NBATeams) {
    if (truncatedDocText.includes(NBATeam)) {
      addTeam(NBATeam);
      if (teams.current.length == 2) {
        const siteName = getNameFromURL(siteURL)
        const scrapingFunction = siteMap[siteName]
        const ticketInfo = scrapingFunction(truncatedDocText)
        fetch('http://localhost:6969/find-sports-tickets', {
          headers: {
            team1: teams.current[0],
            team2: teams.current[1],
            section: ticketInfo[0],
            row: ticketInfo[1],
            price: ticketInfo[2],
            quantity: ticketInfo[3],
          },
        })
          .then((res) => res.json())
          .then((dataArray) => {
            for (const [_, item] of dataArray.entries()) {
              const newData = {
                logo: item['name'],
                section: item['section'],
                row: item['row'],
                price: item['price'],
                url: item['url'],
              };
              addData((data) => [...data, newData]);
            }
            setLoader(false);
          })
          .catch((err) => {
            console.log('Error:', err);
          });
        break;
      }
    }
  }
}


export default findSportsTickets;