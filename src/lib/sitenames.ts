const siteNames = [
  'example',
  'axs',
  'stubhub',
  'seatgeek',
  'ticketmaster',
  'ticketsmarter',
  'vividseats',
  'tickpick',
];

const properSiteNamesDict = {
  spotlight: 'Spotlight',
  example: 'Example',
  axs: 'AXS',
  stubhub: 'StubHub',
  seatgeek: 'SeatGeek',
  ticketmaster: 'TicketMaster',
  ticketsmarter: 'TicketSmarter',
  vividseats: 'VividSeats',
  tickpick: 'TickPick',
};

export const getProperSiteName = (siteName: string) =>
  properSiteNamesDict[siteName];

export default siteNames;
