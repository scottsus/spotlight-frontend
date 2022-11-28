// Helper functions for the Main list Component
export const seenItems: Set<string> = new Set<string>();

export const processTickets = (ticket, seenItems: Set<string>) => {
  if (seenItems.has(ticket.url)) return false;
  seenItems.add(ticket.url);
  return true;
};

export const extractPriceFromKey = (key: string) => {
  const parts = key.split('|?|');
  return parseFloat(parts[0]);
};

export const sortedInsert = (
  newCollapsible: JSX.Element,
  collapsibleItems: JSX.Element[]
) => {
  let idx = 0,
    n = collapsibleItems.length;

  const newPrice = extractPriceFromKey(newCollapsible.key.toString());
  for (idx = 0; idx < n; idx++) {
    const collapsible = collapsibleItems[idx];
    const price = extractPriceFromKey(collapsible.key.toString());
    if (price > newPrice) break;
  }

  collapsibleItems.splice(idx, 0, newCollapsible);
  return;
};
