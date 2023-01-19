import React, { useEffect } from 'react';
import styled from 'styled-components';

import TicketInfo from '../lib/ticketInfo';
import FilterSortby from './options/Options';

import Logo from '../components/Logo';
import Title from '../components/Title';
import MainList from './ResultsList';
import Checking from './loading/Checking';
import Progress from './loading/Progress';
import Skeletons from './loading/Skeletons';

interface IAppBox {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  srcTicketInfo: TicketInfo;
  destTickets: TicketInfo[];
  hasLoadedOne: boolean;
  hasLoadedAll: boolean;
}

export default function AppBox({
  tagIsOpened,
  setTagIsOpened,
  destTickets,
  srcTicketInfo,
  hasLoadedOne,
  hasLoadedAll,
}: IAppBox) {
  useEffect(() => {}, [srcTicketInfo]);
  return (
    <AppBoxDiv isVisible={tagIsOpened}>
      <Logo />
      <XButton setTagIsOpened={setTagIsOpened} />
      {srcTicketInfo && (
        <Title
          team1={srcTicketInfo.team1}
          team2={srcTicketInfo.team2}
          day={srcTicketInfo.day}
          date={srcTicketInfo.date}
          time={srcTicketInfo.time}
          stadium={srcTicketInfo.stadium}
          city={srcTicketInfo.city}
          state={srcTicketInfo.state}
        />
      )}
      <div style={loadingStyles}>
        {/* <Filters /> */}
        <FilterSortby />
        <Progress hasLoadedAll={hasLoadedAll} />
      </div>
      <Checking hasLoadedAll={hasLoadedAll} />
      <Skeletons hasLoadedOne={hasLoadedOne} />
      {hasLoadedOne && (
        <MainList tickets={destTickets} hasLoadedAll={hasLoadedAll} />
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

const loadingStyles = {
  height: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '10px 0px',
};

interface IXButton {
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function XButton({ setTagIsOpened }: IXButton) {
  return (
    <XButtonContainer onClick={() => setTagIsOpened(false)}>
      <img src={chrome.runtime.getURL('imgs/X Button.png')} />
    </XButtonContainer>
  );
}

const XButtonContainer = styled.button`
  position: absolute;
  top: 5%;
  right: 5%;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
`;
