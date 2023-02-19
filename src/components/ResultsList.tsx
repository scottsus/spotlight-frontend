import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

import TicketInfo from '../lib/TicketInfo';
import Options from '../lib/options';
import { processTickets, seenItems, sortedInsert } from '../lib/mainListUtils';
import TicketContainer from './ticketBlock/Container';

interface IResultsList {
  tickets: TicketInfo[];
  hasLoadedAll: boolean;
  options: Options;
}

export default function ResultsList({
  tickets,
  hasLoadedAll,
  options,
}: IResultsList) {
  const ticketContainerItemsRef = useRef<JSX.Element[]>([]);
  const [_, setTicketContainerItems] = useState<string>(
    JSON.stringify(ticketContainerItemsRef.current)
  );

  const useFilters = (ticketContainer: JSX.Element) => {
    // console.log('Filters:', filterOptions);
    // console.log('Props:', ticketContainer.props.children.props);
    const filterOptions = options.filterOptions;

    const ticketPrice = parseFloat(ticketContainer.props.children.props.price);
    if (
      !(
        filterOptions.minPrice <= ticketPrice &&
        ticketPrice <= filterOptions.maxPrice
      )
    )
      return false;

    const ticketQuantity = ticketContainer.props.children.props.quantity;
    let minQuantitySatisfied = false;
    for (const numTicketNeeded of filterOptions.numTicketsArr) {
      if (ticketQuantity >= numTicketNeeded) minQuantitySatisfied = true;
    }
    if (!minQuantitySatisfied) return false;

    /* TODO: FILTER BY WEBSITE NAME
    const websiteName = ticketContainer.props.children.props.logo;
    console.log('WebsiteName:', websiteName);
    for (const chosenWebsite of filterOptions.chosenWebsites) {
      if (chosenWebsite.toLowerCase() !== websiteName) return false;
    }
    */
    return true;
  };

  const useSortBy = (
    ticketContainerItemsRef: React.MutableRefObject<JSX.Element[]>
  ) => {
    ticketContainerItemsRef.current.sort((a, b) => {
      const priceA = a.props.children.props.price;
      const priceB = b.props.children.props.price;
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
              logo={chrome.runtime.getURL(`imgs/${ticket.site}.svg`)}
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
  }, [tickets, options]);

  return (
    <ResultsListDiv isDone={hasLoadedAll} transition={{ staggerChildren: 0.5 }}>
      {options.filterOptions
        ? ticketContainerItemsRef.current.filter(useFilters)
        : ticketContainerItemsRef.current}
    </ResultsListDiv>
  );
}

const ResultsListDiv = styled(motion.div)<{ isDone: boolean }>`
  width: 509px;
  max-height: ${(props) => (props.isDone ? '368px' : '308px')};
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
