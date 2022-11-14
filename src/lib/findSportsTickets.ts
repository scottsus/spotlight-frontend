import { ICollapsible } from "../components/Collapsible";

interface scrapeInfo {(
  document:string, 
  NBATeams:string[], 
  teams:React.MutableRefObject<string[]>, 
  addTeam:(string)=>void, 
  data:ICollapsible[], 
  addData:React.Dispatch<React.SetStateAction<ICollapsible[]>>, 
  setLoader:React.Dispatch<React.SetStateAction<boolean>>):void
}

const findSportsTickets:scrapeInfo = (document, NBATeams, teams, addTeam, data, addData, setLoader) => {
  const truncatedDocText: string = document;
  console.log(truncatedDocText);
  for (const NBATeam of NBATeams) {
    if (truncatedDocText.includes(NBATeam)) {
      addTeam(NBATeam);
      if (teams.current.length == 2) {
        const seats = getSeats(truncatedDocText)
        fetch('http://localhost:6969/find-sports-tickets', {
          headers: {
            team1: teams.current[0],
            team2: teams.current[1],
            section: seats[0],
            row: seats[1],
            price: seats[2],
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

const getSeats = (text:string) => {
  const spaces = text.split(' ')
  let parts = []
  for (const space of spaces) {
    const newlines = space.split('\n')
    for (const newline of newlines)
      if (newline !== '')
        parts.push(newline)
  }
  let sIdx = 0;
  while (sIdx < parts.length && parts[sIdx] !== 'Section') {
    sIdx++;
  }
  let rIdx = 0;
  while (rIdx < parts.length && parts[rIdx] !== 'Row') {
    rIdx++
  }
  let pIdx = 0;
  while (rIdx < parts.length && parts[pIdx].charAt(0) !== '$') {
    pIdx++;
  }
  const sectionNumber = truncate(parts[sIdx + 1])
  const rowNumber = truncate(parts[rIdx + 1])
  const price = parts[pIdx].substring(1)
  const quantity = parts[pIdx + 2] // unused for now
  return [sectionNumber, rowNumber, price]
}

const truncate = (text:string) => {
  return text.replace(/\,/g,'')
}

export default findSportsTickets;