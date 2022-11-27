import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import BlackPurple from './BlackPurple';
import Box from './Box';
import Boxes from './Boxes';

interface IFilterConfig {
  filtersIsOpen: boolean;
  toggle: () => void;
}

const FilterConfig: React.FC<IFilterConfig> = ({ filtersIsOpen, toggle }) => {
  const numberList = ['Any', '1', '2', '3', '4', '5', '6', '7', '8', '9+'];
  const websitesList = ['Any', 'Ticketmaster', 'SeatGeek', 'Stubhub'];
  return (
    <AnimatePresence>
      {filtersIsOpen && (
        <motion.div
          style={filterConfigStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <BlackPurple black='Price Range:' purple='$100 - $1,100' />
          <div style={sliderBoxStyles}>
            <Box content={'$100'} isClickable={false} widthPercentage={'14%'} />
            <img
              src={chrome.runtime.getURL('range-slider.png')}
              alt='range slider'
              style={imgStyles}
            />
            <Box
              content={'$1,100'}
              isClickable={false}
              widthPercentage={'16%'}
            />
          </div>
          <BlackPurple black='Number of Tickets:' purple='2' />
          <Boxes contentList={numberList} />
          <BlackPurple black='Websites:' purple='Ticketmaster, SeatGeek' />
          <Boxes contentList={websitesList} />
          <div style={buttonsStyles}>
            <button onClick={toggle} style={listingsStyles}>
              Back to Listings
            </button>
            <button onClick={toggle} style={applyStyles}>
              Apply Changes
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const filterConfigStyles: React.CSSProperties = {
  margin: '0px 0px',
  padding: '10px 17px',
  border: '2px solid #4B3BFF',
  borderRadius: '5px',
  height: '320px',
  width: '420px',
  backgroundColor: '#FFFFFF',
  zIndex: 1001,
};

const sliderBoxStyles: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
};

const imgStyles: React.CSSProperties = {
  width: '64%',
};

const buttonsStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  margin: '10px 0px',
};

const listingsStyles: React.CSSProperties = {
  border: 'none',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
};

const applyStyles: React.CSSProperties = {
  border: 'none',
  borderRadius: '20px',
  backgroundColor: '#4B3BFF',
  color: '#FFFFFF',
  padding: '12px 18px',
  cursor: 'pointer',
};

export default FilterConfig;
