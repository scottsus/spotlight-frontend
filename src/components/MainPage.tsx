import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import XButton from '../components/XButton';
import Logo from '../components/Logo';
import Title from '../components/Title';
import Filters from './filterSortby/FilterSortby';
import MainList from '../components/MainList';
import Checking from './loading/Checking';
import Progress from './loading/Progress';
import Skeletons from './loading/Skeletons';

const MainPage = ({
  tagIsOpened,
  setTagIsOpened,
  teams,
  isLoading,
  tickets,
}) => {
  return (
    <AnimatePresence>
      {tagIsOpened && (
        <motion.div
          style={appStyles}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
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
          <Filters />
          {isLoading ? (
            <div>
              <Checking isLoading={isLoading} />
              <Progress />
              <Skeletons />
            </div>
          ) : (
            <MainList tickets={tickets} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
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
