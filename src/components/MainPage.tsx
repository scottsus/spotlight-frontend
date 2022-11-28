import React from 'react';
import { motion } from 'framer-motion';

import XButton from '../components/XButton';
import Logo from '../components/Logo';
import Title from '../components/Title';
import Filters from './filterSortby/FilterSortby';
import MainList from '../components/MainList';
import Checking from './loading/Checking';
import Progress from './loading/Progress';
import Skeletons from './loading/Skeletons';

interface IMainPage {}

const MainPage = ({
  tagIsOpened,
  setTagIsOpened,
  teams,
  tickets,
  hasLoadedOne,
  hasLoadedAll,
}) => {
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
        <XButton tagIsOpened={tagIsOpened} setTagIsOpened={setTagIsOpened} />
        <Title
          team1={teams.current[0]}
          team2={teams.current[1]}
          stadium='SoFi Stadium'
          city='Inglewood'
          state='CA'
          day='Sat'
          date='Nov 26'
          time='6:30pm'
        />
        <div style={loadingStyles}>
          <Filters />
          <Checking hasLoadedAll={hasLoadedAll} />
        </div>

        <Progress hasLoadedAll={hasLoadedAll} />

        <Skeletons hasLoadedOne={hasLoadedOne} />
        {hasLoadedOne && (
          <MainList tickets={tickets} hasLoadedAll={hasLoadedAll} />
        )}
      </motion.div>
    </div>
  );
};

const appStyles: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  color: 'black',
  position: 'absolute',
  left: '53%',
  top: '1%',
  width: '500px',
  height: '650px',
  borderRadius: '10px',
  zIndex: 1000,
  padding: '20px 40px',
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
