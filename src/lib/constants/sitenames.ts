const siteNames = [
  'axs',
  'example',
  'seatgeek',
  'stubhub',
  'ticketiq',
  'ticketmaster',
  'tickpick',
  'vividseats',
];

const properSiteNamesDict = {
  axs: 'AXS',
  example: 'Example',
  seatgeek: 'SeatGeek',
  stubhub: 'StubHub',
  ticketiq: 'TicketIQ',
  ticketmaster: 'Ticketmaster',
  tickpick: 'TickPick',
  vividseats: 'VividSeats',
};

export const getProperSiteName = (siteName: string) =>
  properSiteNamesDict[siteName];

export const NUM_FUNCTIONAL_SITES = siteNames.length - 3;

export default siteNames;
