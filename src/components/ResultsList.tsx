import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

import TicketInfo from '../lib/types/ticketInfo';
import Options from '../lib/types/options';
import { processTickets, seenItems, sortedInsert } from '../lib/mainListUtils';
import TicketContainer from './ticketBlock/Container';

interface IResultsList {
  srcTicket: TicketInfo;
  destTickets: TicketInfo[];
  hasProcessedAll: boolean;
  options: Options;
}

export default function ResultsList({
  srcTicket,
  destTickets,
  hasProcessedAll,
  options,
}: IResultsList) {
  const ticketContainerItemsRef = useRef<JSX.Element[]>([]);
  const [_, setTicketContainerItems] = useState<string>(
    JSON.stringify(ticketContainerItemsRef.current)
  );

  const useFilters = (ticketContainer: JSX.Element) => {
    const filterOptions = options.filterOptions;

    const ticketPrice = parseFloat(
      ticketContainer.props.children.props.destTicket.priceInfo.totalPrice
    );
    if (
      !(
        filterOptions.minPrice <= ticketPrice &&
        ticketPrice <= filterOptions.maxPrice
      )
    )
      return false;

    const ticketQuantity = parseInt(
      ticketContainer.props.children.props.destTicket.quantity
    );
    const numTicketsNeededStr = filterOptions.numTickets;
    if ((numTicketsNeededStr as string) !== `Any`) {
      const numTicketsNeeded = parseInt(numTicketsNeededStr as string);
      console.log(`num:`, numTicketsNeeded);
      if (ticketQuantity < numTicketsNeeded) return false;
    }

    const websiteName = ticketContainer.props.children.props.destTicket.site;
    for (const chosenWebsite of filterOptions.chosenWebsites) {
      if (
        chosenWebsite === 'Any' ||
        chosenWebsite.toLowerCase() === websiteName
      )
        return true;
    }

    return false;
  };

  const useSortBy = (
    ticketContainerItemsRef: React.MutableRefObject<JSX.Element[]>
  ) => {
    ticketContainerItemsRef.current.sort((a, b) => {
      const priceA = a.props.children.props.destTicket.priceInfo.totalPrice;
      const priceB = b.props.children.props.destTicket.priceInfo.totalPrice;
      if (options.sortByOptions.isAscending) return priceA - priceB;
      return priceB - priceA;
    });
    setTicketContainerItems(JSON.stringify(ticketContainerItemsRef.current));
  };

  useEffect(() => {
    if (options.sortByOptions) {
      useSortBy(ticketContainerItemsRef);
      return;
    }
    for (const ticket of destTickets) {
      if (processTickets(ticket, seenItems)) {
        const newTicketContainer = (
          <motion.div
            variants={ticketContainerAnimations}
            initial="hidden"
            animate="show"
            key={ticket.priceInfo.totalPrice + '|?|' + ticket.url}
          >
            <TicketContainer srcTicket={srcTicket} destTicket={ticket} />
          </motion.div>
        );
        sortedInsert(newTicketContainer, ticketContainerItemsRef.current);
        setTicketContainerItems(
          JSON.stringify(ticketContainerItemsRef.current)
        );
      }
    }
  }, [destTickets, options]);

  return (
    <ResultsListDiv
      isDone={hasProcessedAll}
      transition={{ staggerChildren: 0.5 }}
    >
      {options.filterOptions
        ? ticketContainerItemsRef.current.filter(useFilters)
        : ticketContainerItemsRef.current}
    </ResultsListDiv>
  );
}

const ResultsListDiv = styled(motion.div)<{ isDone: boolean }>`
  width: 509px;
  max-height: ${(props) => (props.isDone ? '375px' : '308px')};
  margin: 0 auto;
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
