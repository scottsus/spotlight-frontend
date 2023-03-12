const siteNames = [
  'axs',
  'example',
  'seatgeek',
  'stubhub',
  'ticketmaster',
  'ticketsmarter',
  'tickpick',
  'vividseats',
];

const properSiteNamesDict = {
  axs: 'AXS',
  example: 'Example',
  seatgeek: 'SeatGeek',
  stubhub: 'StubHub',
  ticketmaster: 'TicketMaster',
  ticketsmarter: 'TicketSmarter',
  tickpick: 'TickPick',
  vividseats: 'VividSeats',
};

export const getProperSiteName = (siteName: string) =>
  properSiteNamesDict[siteName];

export const NUM_FUNCTIONAL_SITES = siteNames.length - 3;

export default siteNames;
