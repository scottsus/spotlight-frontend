import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Collapsible, { ICollapsible } from './collapsible/Collapsible';
import { processTickets, seenItems, sortedInsert } from '../lib/mainListUtils';

interface IMainList {
  tickets: ICollapsible[];
}

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
        sortedInsert(newCollapsible, collapsibleItems, setCollapsibleItems);
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
      duration: 0.8,
      damping: 12,
    },
  },
};

export default MainList;
