interface ITicketInfo {
  team1: string;
  team2: string;
  section: string;
  row: string;
  totalPrice: string;
  quantity: string;
  day: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  state: string;
  site: string;
  url: string;
}

class TicketInfo implements ITicketInfo {
  team1: string;
  team2: string;
  section: string;
  row: string;
  totalPrice: string;
  quantity: string;
  day: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  state: string;
  site: string;
  url: string;
  constructor(
    team1,
    team2,
    section,
    row,
    totalPrice,
    quantity,
    day,
    date,
    time,
    stadium,
    city,
    state,
    site,
    url
  ) {
    this.team1 = team1;
    this.team2 = team2;
    this.section = section;
    this.row = row;
    this.totalPrice = totalPrice;
    this.quantity = quantity;
    this.day = day;
    this.date = date;
    this.time = time;
    this.stadium = stadium;
    this.city = city;
    this.state = state;
    this.site = site;
    this.url = url;
  }
}

export default TicketInfo;
