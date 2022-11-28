import React, { useState, useRef, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Collapsible, { ICollapsible } from './collapsible/Collapsible';
import { processTickets, seenItems, sortedInsert } from '../lib/mainListUtils';

interface IMainList {
  tickets: ICollapsible[];
  hasLoadedAll: boolean;
}

const MainList: React.FC<IMainList> = ({ tickets, hasLoadedAll }) => {
  const collapsibleItemsRef = useRef<JSX.Element[]>([]);
  const [_, setCollapsibleItems] = useState<string>(
    JSON.stringify(collapsibleItemsRef.current)
  );
  useEffect(() => {
    for (const ticket of tickets) {
      if (processTickets(ticket, seenItems)) {
        const newCollapsible = (
          <motion.div
            variants={collapsibleAnimations}
            initial='hidden'
            animate='show'
            key={ticket.price + '|?|' + ticket.url}
          >
            <Collapsible
              logo={chrome.runtime.getURL(`${ticket.logo}.png`)}
              section={ticket.section}
              row={ticket.row}
              price={ticket.price}
              url={ticket.url}
            />
          </motion.div>
        );
        sortedInsert(newCollapsible, collapsibleItemsRef.current);
        setCollapsibleItems(JSON.stringify(collapsibleItemsRef.current));
      }
    }
  }, [tickets]);
  return (
    <div style={{ ...mainListStyles, ...chooseHeight(hasLoadedAll) }}>
      {collapsibleItemsRef.current}
    </div>
  );
};

const mainListStyles: React.CSSProperties = {
  marginTop: '10px',
  height: '75%',
  overflowY: 'scroll',
};

const collapsibleAnimations: Variants = {
  hidden: {
    x: 300,
  },
  show: {
    x: 0,
    transition: {
      type: 'spring',
      duration: 2.5,
      damping: 12,
    },
  },
};

const chooseHeight = (hasLoadedAll: boolean) => {
  if (!hasLoadedAll) return shortHeight;
  return longHeight;
};

const shortHeight: React.CSSProperties = {
  height: '60%',
};

const longHeight: React.CSSProperties = {
  height: '75%',
};

export default MainList;
