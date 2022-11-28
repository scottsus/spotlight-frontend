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
      {tagIsOpened && (
        <motion.div
          style={appStyles}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
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
          <Filters />
          <div>
            <Checking hasLoadedAll={hasLoadedAll} />
            <Progress hasLoadedAll={hasLoadedAll} />
          </div>
          <Skeletons hasLoadedOne={hasLoadedOne} />
          {hasLoadedOne && <MainList tickets={tickets} />}
        </motion.div>
      )}
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
};

export default MainPage;
