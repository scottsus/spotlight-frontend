import { IBlock } from "../components/Block";

interface scrapeInfo {
  (document:string, 
  NBATeams:string[], 
  teams:React.MutableRefObject<string[]>, 
  addTeam:(string)=>void, 
  data:IBlock[], 
  addData:React.Dispatch<React.SetStateAction<IBlock[]>>, 
  setLoader:React.Dispatch<React.SetStateAction<boolean>>):void
}

const findSportsTickets:scrapeInfo = (document, NBATeams, teams, addTeam, data, addData, setLoader) => {
  const truncatedDocText: string = document.substring(0, 300);  
  console.log(truncatedDocText);
    for (const NBATeam of NBATeams) {
      if (truncatedDocText.includes(NBATeam)) {
        addTeam(NBATeam);
        if (teams.current.length == 2) {
          fetch('http://localhost:6969/find-sports-tickets', {
            headers: {
              team1: teams.current[0],
              team2: teams.current[1],
            },
          })
            .then((res) => res.json())
            .then((dataArray) => {
              for (const [_, item] of dataArray.entries()) {
                const newData = {
                  logo: item['name'],
                  seats: item['seats'],
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