import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';

import BlackPurple from '../Collapsible/BlackPurple';
import Box from './Box';
import Boxes from './Boxes';

interface IFilterConfig {
  filterConfigIsOpen: boolean;
  toggle: () => void;
}

const FilterConfig: React.FC<IFilterConfig> = ({
  filterConfigIsOpen,
  toggle,
}) => {
  const numberList = ['Any', '1', '2', '3', '4', '5', '6', '7', '8', '9+'];
  const websitesList = ['Any', 'Ticketmaster', 'SeatGeek', 'Stubhub'];
  const leftArrow = faAngleLeft as IconProp;
  return (
    <AnimatePresence>
      {filterConfigIsOpen && (
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
              src={chrome.runtime.getURL('imgs/range-slider.png')}
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
            <button onClick={toggle} style={listingButtonStyles}>
              <div style={inlineMaker}>
                <FontAwesomeIcon icon={leftArrow} />
                <p style={listingPStyles}>Back to Listings</p>
              </div>
            </button>
            <button onClick={toggle} style={applyButtonStyles}>
              <p style={applyPStyles}>Apply Changes</p>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const filterConfigStyles: React.CSSProperties = {
  position: 'absolute',
  top: '211px',
  left: '31px',
  zIndex: 1001,
  border: '2px solid #4B3BFF',
  borderRadius: '10.6px',
  height: '372px',
  width: '509px',
  padding: '10px 37px 20px',
  backgroundColor: '#FFFFFF',
};

const sliderBoxStyles: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
};

const imgStyles: React.CSSProperties = {
  height: '36px',
  width: '64%',
};

const buttonsStyles: React.CSSProperties = {
  margin: '10px 0px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const listingButtonStyles: React.CSSProperties = {
  height: '25px',
  width: '140px',
  border: 'none',
  backgroundColor: '#FFFFFF',
  margin: '30px 0px',
  padding: '0px',
  cursor: 'pointer',
};

const inlineMaker: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const listingPStyles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 500,
  color: '#27292A',
  margin: '0px',
};

const applyButtonStyles: React.CSSProperties = {
  border: 'none',
  borderRadius: '22px',
  backgroundColor: '#4B3BFF',
  padding: '11px 24px',
  cursor: 'pointer',
};

const applyPStyles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 500,
  color: '#FFFFFF',
  margin: '0px',
};

export default FilterConfig;
