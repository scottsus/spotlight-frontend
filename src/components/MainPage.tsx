import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import TicketInfo from '../lib/ticketInfo';

import XButton from '../components/XButton';
import Logo from '../components/Logo';
import Title from '../components/Title';
import Filters from './filterSortby/FilterSortby';
import MainList from '../components/MainList';
import Checking from './loading/Checking';
import Progress from './loading/Progress';
import Skeletons from './loading/Skeletons';

interface IMainPage {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  srcTicketInfo: TicketInfo;
  destTickets: TicketInfo[];
  hasLoadedOne: boolean;
  hasLoadedAll: boolean;
}

const MainPage: React.FC<IMainPage> = ({
  tagIsOpened,
  setTagIsOpened,
  destTickets,
  srcTicketInfo,
  hasLoadedOne,
  hasLoadedAll,
}) => {
  useEffect(() => {}, [srcTicketInfo]);
  return (
    <div>
      <motion.div
        style={
          tagIsOpened
            ? { ...appStyles, visibility: 'visible' }
            : { ...appStyles, visibility: 'hidden' }
        }
        initial='hidden'
        animate={
          tagIsOpened ? { visibility: 'visible' } : { visibility: 'hidden' }
        }
        transition={{ duration: 0.5 }}
      >
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
          <Filters />
          <Progress hasLoadedAll={hasLoadedAll} />
        </div>
        <Checking hasLoadedAll={hasLoadedAll} />
        <Skeletons hasLoadedOne={hasLoadedOne} />
        {hasLoadedOne && (
          <MainList tickets={destTickets} hasLoadedAll={hasLoadedAll} />
        )}
      </motion.div>
    </div>
  );
};

const appStyles: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  color: 'black',
  position: 'absolute',
  left: '698px',
  top: '13px',
  width: '573px',
  height: '604px',
  borderRadius: '10.6px',
  zIndex: 1000,
  padding: '28px 31px',
  filter: 'drop-shadow(0 0 0.75rem rgb(101, 100, 100))',
  overflow: 'hidden',
};

const loadingStyles = {
  height: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '10px 0px',
};

export default MainPage;
