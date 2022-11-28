import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Collapsible, { ICollapsible } from './collapsible/Collapsible';

interface IMainList {
  tickets: ICollapsible[];
}

const seenItems: Set<string> = new Set<string>();
const processTickets = (ticket, seenItems: Set<string>) => {
  if (seenItems.has(ticket.url)) return false;
  seenItems.add(ticket.url);
  return true;
};

const MainList: React.FC<IMainList> = ({ tickets }) => {
  const [collapsibleItems, setCollapsibleItems] = useState<JSX.Element[]>([]);
  useEffect(() => {
    for (const ticket of tickets) {
      if (processTickets(ticket, seenItems)) {
        const newCollapsible = (
          <motion.div
            variants={collapsibleAnimations}
            initial='hidden'
            animate='show'
            key={ticket.url}
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
        setCollapsibleItems((collapsibleItems) => [
          ...collapsibleItems,
          newCollapsible,
        ]);
      }
    }
  }, [tickets]);
  return (
    <motion.div style={mainListStyles} variants={mainListAnimations}>
      {collapsibleItems}
    </motion.div>
  );
};

const mainListStyles: React.CSSProperties = {
  marginTop: '-20px',
  height: '75%',
  overflowY: 'scroll',
};

const mainListAnimations: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 1.0,
    },
  },
};

const collapsibleAnimations: Variants = {
  hidden: {
    x: 300,
  },
  show: {
    x: 0,
    transition: {
      type: 'spring',
      duration: 0.5,
    },
  },
};

export default MainList;
