class TicketInfo {
  actor1: string;
  actor2?: string;
  quantity: number;
  seatInfo: SeatInfo;
  priceInfo: PriceInfo;
  venueInfo: VenueInfo;
  timeInfo: TimeInfo;
  site: string;
  url: string;
  isTestMode?: boolean;
  constructor(
    actor1: string,
    actor2: string = '',
    quantity: number,
    seatInfo: SeatInfo,
    priceInfo: PriceInfo,
    venueInfo: VenueInfo,
    timeInfo: TimeInfo,
    site: string,
    url: string,
    isTestMode: boolean = false
  ) {
    this.actor1 = actor1;
    this.actor2 = actor2;
    this.quantity = quantity;
    this.seatInfo = seatInfo;
    this.priceInfo = priceInfo;
    this.venueInfo = venueInfo;
    this.timeInfo = timeInfo;
    this.site = site;
    this.url = url;
    this.isTestMode = isTestMode;
  }
}

export class SeatInfo {
  isAssigned: boolean;
  section: string;
  row?: string;
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
