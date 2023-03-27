const siteNames = [
  'axs',
  'example',
  'seatgeek',
  'stubhub',
  'gametime',
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
  gametime: 'GameTime',
  ticketiq: 'TicketIQ',
  ticketmaster: 'Ticketmaster',
  tickpick: 'TickPick',
  vividseats: 'VividSeats',
};

export const getNameFromURL = (url: string) => {
  for (const siteName of siteNames) {
    if (url.includes(siteName)) return siteName;
  }
  return '';
};

export const getProperSiteName = (siteName: string) =>
  properSiteNamesDict[siteName];

export const NUM_FUNCTIONAL_SITES = siteNames.length - 1;

export default siteNames;
