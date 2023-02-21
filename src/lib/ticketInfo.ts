class TicketInfo {
  team1?: string;
  team2?: string;
  performers?: string[];
  quantity: number;
  seatInfo: SeatInfo;
  priceInfo: PriceInfo;
  venueInfo: VenueInfo;
  timeInfo: TimeInfo;
  site: string;
  url: string;
  constructor(
    team1: string = '',
    team2: string = '',
    performers: string[] = [],
    quantity: number,
    seatInfo: SeatInfo,
    priceInfo: PriceInfo,
    venueInfo: VenueInfo,
    timeInfo: TimeInfo,
    site: string,
    url: string
  ) {
    this.team1 = team1;
    this.team2 = team2;
    this.performers = performers;
    this.quantity = quantity;
    this.seatInfo = seatInfo;
    this.priceInfo = priceInfo;
    this.venueInfo = venueInfo;
    this.timeInfo = timeInfo;
    this.site = site;
    this.url = url;
  }
}

export class SeatInfo {
  section: string;
  row: string;
}

export class PriceInfo {
  totalPrice: number;
  quantity: number;
  basePrice: number;
  serviceFee: number;
  deliveryFee: number;
  // TODO: parkingFee: number;
}

export class VenueInfo {
  stadium: string;
  city: string;
  state: string;
}

export class TimeInfo {
  day: string;
  date: string;
  hour: string;
}

export default TicketInfo;
