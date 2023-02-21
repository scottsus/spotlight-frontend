import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

import TicketInfo from '../lib/TicketInfo';
import Options from '../lib/options';
import { processTickets, seenItems, sortedInsert } from '../lib/mainListUtils';
import TicketContainer from './ticketBlock/Container';

interface IResultsList {
  srcTicket: TicketInfo;
  destTickets: TicketInfo[];
  hasLoadedAll: boolean;
  options: Options;
}

export default function ResultsList({
  srcTicket,
  destTickets,
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

    const ticketQuantity = parseInt(
      ticketContainer.props.children.props.quantity
    );
    let minQuantitySatisfied = false;
    for (const numTicketNeededStr of filterOptions.numTicketsArr) {
      if (numTicketNeededStr === 'Any') {
        minQuantitySatisfied = true;
        break;
      }
      const numTicketNeeded = parseInt(numTicketNeededStr);
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
    for (const ticket of destTickets) {
      if (processTickets(ticket, seenItems)) {
        const newTicketContainer = (
          <motion.div
            variants={ticketContainerAnimations}
            initial="hidden"
            animate="show"
            key={ticket.priceInfo.totalPrice + '|?|' + ticket.url}
          >
            <TicketContainer
              logo={chrome.runtime.getURL(`imgs/${ticket.site}.svg`)}
              quantity={ticket.quantity}
              seatInfo={{
                section: ticket.seatInfo.section,
                row: ticket.seatInfo.row,
              }}
              priceInfo={{
                totalPrice: ticket.priceInfo.totalPrice,
                quantity: ticket.priceInfo.quantity,
                basePrice:
                  ticket.priceInfo.totalPrice / ticket.priceInfo.quantity,
                serviceFee: ticket.priceInfo.serviceFee,
                deliveryFee: ticket.priceInfo.deliveryFee,
              }}
              url={ticket.url}
              srcTicket={srcTicket}
            />
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
