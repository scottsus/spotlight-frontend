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
  collapsibleItems: JSX.Element[],
  setCollapsibleItems: React.Dispatch<React.SetStateAction<JSX.Element[]>>
) => {
  let idx = 0,
    n = collapsibleItems.length;
  if (n == 0) {
    setCollapsibleItems((collapsibleItems) => [newCollapsible]);
    return;
  }
  const newPrice = extractPriceFromKey(newCollapsible.key.toString());
  for (idx = 0; idx < n; idx++) {
    const collapsible = collapsibleItems[idx];
    const price = extractPriceFromKey(collapsible.key.toString());
    if (price > newPrice) break;
  }
  if (idx == 0) {
    setCollapsibleItems((collapsibleItems) => [
      newCollapsible,
      ...collapsibleItems,
    ]);
    return;
  }
  const firstHalf = collapsibleItems.slice(0, idx);
  const secondHalf = collapsibleItems.slice(idx, n);
  setCollapsibleItems((collapsibleItems) => [
    ...firstHalf,
    newCollapsible,
    ...secondHalf,
  ]);
};
