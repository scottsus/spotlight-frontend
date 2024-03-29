import TicketInfo from './types/ticketInfo';
import { BASE_URL } from './constants/urls';
import { NUM_FUNCTIONAL_SITES } from './constants/sitenames';

interface IfindCompetingTickets {
  (
    siteName: string,
    srcTicketInfo: TicketInfo,
    addDestTickets: React.Dispatch<React.SetStateAction<TicketInfo[]>>,
    sitesDone: Set<string>,
    setHasOneGoodResult: React.Dispatch<React.SetStateAction<boolean>>,
    setHasLoadedAll: React.Dispatch<React.SetStateAction<boolean>>
  ): void;
}

const findCompetingTickets: IfindCompetingTickets = (
  site,
  srcTicketInfo,
  addDestTickets,
  sitesDone,
  setHasOneGoodResult,
  setHasLoadedAll
) => {
  let seatMode = '';
  if (srcTicketInfo.seatInfo.isAssigned) seatMode = `seated`;
  else seatMode = `standing`;
  const srcSiteUrl = `${BASE_URL}/${seatMode}/${site}`;
  const reqHeaders = setReqHeaders(srcTicketInfo);

  fetch(srcSiteUrl, {
    headers: reqHeaders,
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      if (res.status === 204) {
        console.log(`[${site.toUpperCase()}]: No better deals`);
        return [];
      }

      if (!(200 <= res.status && res.status <= 299))
        throw new Error(
          `[${site.toUpperCase()}]: expected 2xx error code, got ${res.status}`
        );
    })
    .then((jsonArr) => {
      for (const [_, json] of jsonArr.entries()) {
        if (jsonArr.length > 0) setHasOneGoodResult(true);

        const newTicket = jsonToTicketInfo(json, srcTicketInfo);
        addDestTickets((destTickets) => [...destTickets, newTicket]);
      }
    })
    .catch((err) => {
      // No need further processing
      console.log(err);
    })
    .finally(() => {
      sitesDone.add(site);
      if (sitesDone.size === NUM_FUNCTIONAL_SITES) setHasLoadedAll(true);
    });
};

const setReqHeaders = (srcTicketInfo: TicketInfo) => {
  const reqHeaders = {
    actor1: srcTicketInfo.actor1,
    actor2: srcTicketInfo.actor2,
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
    // isTestMode: 'isTestMode',
  };

  return reqHeaders;
};

const jsonToTicketInfo = (json: any, srcTicketInfo: TicketInfo) => {
  const newTicket: TicketInfo = {
    actor1: srcTicketInfo.actor1,
    actor2: srcTicketInfo.actor2,
    quantity: json['quantity'],
    seatInfo: {
      isAssigned: srcTicketInfo.seatInfo.isAssigned,
      section: json['seatInfo']['section'],
      row: json['seatInfo']['row'],
    },
    priceInfo: {
      totalPrice: json['priceInfo']['totalPrice'],
      basePrice: json['priceInfo']['basePrice'],
      quantity: json['priceInfo']['quantity'],
      serviceFee: json['priceInfo']['serviceFee'],
      deliveryFee: json['priceInfo']['deliveryFee'],
    },
    venueInfo: srcTicketInfo.venueInfo,
    timeInfo: srcTicketInfo.timeInfo,
    site: json['name'],
    url: json['url'],
  };

  return newTicket;
};

export default findCompetingTickets;
