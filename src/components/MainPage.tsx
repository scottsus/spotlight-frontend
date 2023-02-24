import React, { useState } from 'react';
import styled from 'styled-components';

import TicketInfo from '../lib/ticketInfo';
import { FilterOptions, SortByOptions } from '../lib/options';
import stateToAbbreviation from '../lib/stateToAbbreviation';

import Options from './options/Options';
import ResultsList from './ResultsList';
import Checking from './loading/Checking';
import Progress from './loading/Progress';
import Skeletons from './loading/Skeletons';
import BestDeal from './loading/BestDeal';

interface IAppBox {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  srcTicketInfo: TicketInfo;
  destTickets: TicketInfo[];
  hasOneGoodResult: boolean;
  hasLoadedAll: boolean;
}

export default function AppBox({
  tagIsOpened,
  setTagIsOpened,
  destTickets,
  srcTicketInfo,
  hasOneGoodResult,
  hasLoadedAll,
}: IAppBox) {
  const [isDoneWithProgressBar, setIsDoneWithProgressBar] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(null);
  const [sortByOptions, setSortByOptions] = useState<SortByOptions>(null);
  return (
    <AppBoxDiv isVisible={tagIsOpened}>
      <Logo>Spotlight</Logo>
      <XButton setTagIsOpened={setTagIsOpened} />

      {srcTicketInfo && (
        <EventTitle
          team1={srcTicketInfo.team1}
          team2={srcTicketInfo.team2}
          day={srcTicketInfo.timeInfo.day}
          date={srcTicketInfo.timeInfo.date}
          time={srcTicketInfo.timeInfo.hour}
          stadium={srcTicketInfo.venueInfo.stadium}
          city={srcTicketInfo.venueInfo.city}
          state={srcTicketInfo.venueInfo.state}
        />
      )}

      <Divider />

      <Progress
        isDoneWithProgressBar={isDoneWithProgressBar}
        setIsDoneWithProgressBar={setIsDoneWithProgressBar}
        hasLoadedAll={hasLoadedAll}
      />

      {isDoneWithProgressBar && hasOneGoodResult && (
        <Options
          setFilterOptions={setFilterOptions}
          setSortByOptions={setSortByOptions}
        />
      )}

      {!hasLoadedAll && <Checking />}

      {!hasOneGoodResult && !hasLoadedAll && <Skeletons />}

      {hasOneGoodResult ? (
        <ResultsList
          srcTicket={srcTicketInfo}
          destTickets={destTickets}
          options={{
            filterOptions: filterOptions,
            sortByOptions: sortByOptions,
          }}
          hasLoadedAll={hasLoadedAll}
        />
      ) : (
        isDoneWithProgressBar && <BestDeal setTagIsOpened={setTagIsOpened} />
      )}
    </AppBoxDiv>
  );
}

const AppBoxDiv = styled.div<{ isVisible: boolean }>`
  position: absolute;
  left: 698px;
  top: 13px;
  width: 573px;
  height: 604px;
  border-radius: 10.6px;
  z-index: 100;
  background-color: #ffffff;
  padding: 28px 31px;
  filter: drop-shadow(0 0 0.75rem rgb(101, 100, 100));
  overflow: hidden;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

const Logo = styled.h1`
  font-size: 30px;
  font-family: Mont;
  font-weight: 800;
  color: #6354ff;
  margin: 0;
`;

const Divider = styled.div`
  height: 2px;
  background-color: #dfe0e0;
`;

interface IEventTitle {
  team1: string;
  team2: string;
  stadium: string;
  city: string;
  state: string;
  day: string;
  date: string;
  time: string;
}

function EventTitle({
  team1,
  team2,
  stadium,
  city,
  state,
  day,
  date,
  time,
}: IEventTitle) {
  return (
    <TitleDiv>
      <Teams>
        {team1} vs {team2}
      </Teams>
      <Venue>
        {stadium} • {city}, {stateToAbbreviation(state)} • {day}, {date} at{' '}
        {time}
      </Venue>
    </TitleDiv>
  );
}

const TitleDiv = styled.div`
  padding: 15px 0 0 0;
  margin: 0 0 10px 0;
`;

const Teams = styled.h2`
  font-size: 20px;
  font-family: Helvetica;
  font-weight: 600;
  margin: 7px 0;
`;

const Venue = styled.h4`
  font-size: 16px;
  font-family: Helvetica;
  font-weight: 300;
  margin: 4px 0;
`;

interface IXButton {
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function XButton({ setTagIsOpened }: IXButton) {
  return (
    <XButtonContainer onClick={() => setTagIsOpened(false)}>
      <Image src={chrome.runtime.getURL('imgs/X Button.svg')} />
    </XButtonContainer>
  );
}

const XButtonContainer = styled.button`
  position: absolute;
  top: 5%;
  right: 5%;
  border: none;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  :hover {
    background-color: #f1f1f1;
  }
`;

const Image = styled.img`
  width: 18px;
  height: 18px;
`;
