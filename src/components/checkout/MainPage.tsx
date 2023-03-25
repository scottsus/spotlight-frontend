import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import TicketInfo from '../../lib/types/ticketInfo';
import { FilterOptions, SortByOptions } from '../../lib/types/options';
import stateToAbbreviation from '../../lib/constants/stateToAbbreviation';

import Header from '../general/Header';
import Divider from '../general/Divider';

import ResultsList from './ResultsList';
import Options from './options/Options';
import Checking from './loading/Checking';
import Progress from './loading/Progress';
import Skeletons from './loading/Skeletons';
import BestDeal from './loading/BestDeal';
import Draggable from 'react-draggable';

interface IAppBox {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  srcTicketInfo: TicketInfo;
  destTickets: TicketInfo[];
  hasOneGoodResult: boolean;
  hasProcessedAll: boolean;
}

export default function AppBox({
  tagIsOpened,
  setTagIsOpened,
  destTickets,
  srcTicketInfo,
  hasOneGoodResult,
  hasProcessedAll,
}: IAppBox) {
  const [isDoneWithProgressBar, setIsDoneWithProgressBar] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(null);
  const [sortByOptions, setSortByOptions] = useState<SortByOptions>(null);
  const [isBestDeal, setIsBestDeal] = useState(false);
  const [height, setHeight] = useState(604);
  useEffect(() => {
    if (isDoneWithProgressBar && !hasOneGoodResult) {
      setIsBestDeal(true);
      setHeight(260);
    }
  }, [isDoneWithProgressBar, hasOneGoodResult]);
  return (
    <Draggable>
      <AppBoxDiv isVisible={tagIsOpened} height={height}>
        {!isBestDeal ? (
          <>
            <Header setTagIsOpened={setTagIsOpened} logoMargin="8px 0 0" />

            {srcTicketInfo && <EventTitle ticket={srcTicketInfo} />}

            <Divider margin="15px auto -3px" />

            <Progress
              isDoneWithProgressBar={isDoneWithProgressBar}
              setIsDoneWithProgressBar={setIsDoneWithProgressBar}
              hasProcessedAll={hasProcessedAll}
            />

            {hasProcessedAll && hasOneGoodResult && (
              <Options
                isReady={isDoneWithProgressBar && hasOneGoodResult}
                sortByOptions={sortByOptions}
                setFilterOptions={setFilterOptions}
                setSortByOptions={setSortByOptions}
              />
            )}

            {!hasProcessedAll && <Checking />}

            {!hasProcessedAll && !hasOneGoodResult && <Skeletons />}

            <ResultsList
              srcTicket={srcTicketInfo}
              destTickets={destTickets}
              options={{
                filterOptions: filterOptions,
                sortByOptions: sortByOptions,
              }}
              hasProcessedAll={hasProcessedAll}
            />
          </>
        ) : (
          <BestDeal setTagIsOpened={setTagIsOpened} />
        )}
      </AppBoxDiv>
    </Draggable>
  );
}

interface IAppBoxDiv {
  isVisible: boolean;
  height: number;
}

const AppBoxDiv = styled.div<IAppBoxDiv>`
  position: absolute;
  left: 698px;
  top: 13px;
  width: 573px;
  height: ${(props) => props.height}px;
  border-radius: 10.6px;
  background-color: #ffffff;
  z-index: 100;
  padding: 20px 32px;
  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.26));
  overflow: hidden;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transition: height 1s ease-in-out;
`;

interface IEventTitle {
  ticket: TicketInfo;
}

function EventTitle({ ticket }: IEventTitle) {
  return (
    <TitleDiv>
      <Teams>
        {ticket.seatInfo.isAssigned
          ? `${ticket.actor1} vs. ${ticket.actor2}`
          : `${ticket.actor1}`}
      </Teams>
      <Venue>
        {ticket.venueInfo.stadium} · {ticket.venueInfo.city},{' '}
        {stateToAbbreviation(ticket.venueInfo.state)} · {ticket.timeInfo.day},{' '}
        {ticket.timeInfo.date} at {ticket.timeInfo.hour}
      </Venue>
    </TitleDiv>
  );
}

const TitleDiv = styled.div`
  margin: 20px 0 0 0;
`;

const Teams = styled.h2`
  font-size: 20px;
  font-family: HelveticaNeue;
  font-weight: 500;
  margin: 0 0 0.8px 0;
`;

const Venue = styled.h4`
  font-size: 16px;
  font-family: HelveticaNeue;
  font-weight: 300;
  white-space: nowrap;
  overflow-x: scroll;
`;
