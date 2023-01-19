import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import TicketContainer from './ticketBlock/Container';
import TicketInfo from '../lib/TicketInfo';
import { processTickets, seenItems, sortedInsert } from '../lib/mainListUtils';

interface IResultsList {
  tickets: TicketInfo[];
  hasLoadedAll: boolean;
}

export default function ResultsList({ tickets, hasLoadedAll }: IResultsList) {
  const ticketContainerItemsRef = useRef<JSX.Element[]>([]);
  const [_, setTicketContainerItems] = useState<string>(
    JSON.stringify(ticketContainerItemsRef.current)
  );

  useEffect(() => {
    for (const ticket of tickets) {
      if (processTickets(ticket, seenItems)) {
        const newTicketContainer = (
          <motion.div
            variants={ticketContainerAnimations}
            initial="hidden"
            animate="show"
            key={ticket.totalPrice + '|?|' + ticket.url}
          >
            <TicketContainer
              logo={chrome.runtime.getURL(`imgs/${ticket.site}.png`)}
              section={ticket.section}
              row={ticket.row}
              price={ticket.totalPrice}
              quantity={ticket.quantity}
              url={ticket.url}
            />
          </motion.div>
        );
        sortedInsert(newTicketContainer, ticketContainerItemsRef.current);
        setTicketContainerItems(
          JSON.stringify(ticketContainerItemsRef.current)
        );
      }
    }
  }, [tickets]);

  return (
    <ResultsListDiv isDone={hasLoadedAll}>
      {ticketContainerItemsRef.current}
    </ResultsListDiv>
  );
}

const ResultsListDiv = styled.div<{ isDone: boolean }>`
  width: 509px;
  max-height: ${(props) => (props.isDone ? '368px' : '278px')};
  margin: 10px auto;
  overflow-y: scroll;
`;

const ticketContainerAnimations: Variants = {
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
