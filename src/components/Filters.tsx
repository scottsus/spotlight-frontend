import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterConfig from './FilterConfig';
import SortbyConfig from './SortbyConfig';

interface IFilters {}

const Filters: React.FC<IFilters> = () => {
  const [filtersIsOpen, setFiltersIsOpen] = useState(false);
  const [sortbyIsOpen, setsortbyIsOpen] = useState(false);
  const toggleFilters = () => {
    setFiltersIsOpen((filtersIsOpen) => !filtersIsOpen);
  };
  const toggleSortby = () => {
    setsortbyIsOpen((sortbyIsOpen) => !sortbyIsOpen);
  };
  return (
    <div style={filtersStyles}>
      <div style={parentStyles}>
        <div style={buttonStyles} onClick={toggleFilters}>
          <img src={chrome.runtime.getURL('filter.png')} style={imgStyles} />
          <h3 style={h3Styles}>Filters</h3>
        </div>
        <AnimatePresence>
          {filtersIsOpen && (
            <motion.div
              className='box'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                zIndex: 1001,
              }}
            >
              <FilterConfig toggle={toggleFilters} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div style={parentStyles}>
        <div style={buttonStyles} onClick={toggleSortby}>
          <h3 style={h3Styles}>Sort By:</h3>
        </div>
      </div>
      {sortbyIsOpen && <SortbyConfig />}
    </div>
  );
};

const filtersStyles: React.CSSProperties = {
  color: '#4B3BFF',
  height: '30px',
  width: '100%',
  margin: '20px 0px',
  display: 'flex',
};

const parentStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '85px',
  maxWidth: '85px',
};

const buttonStyles: React.CSSProperties = {
  border: '2px solid #4B3BFF',
  borderRadius: '5px',
  height: '90%',
  display: 'flex',
  margin: '0px 5px 10px 5px',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  cursor: 'pointer',
};

const h3Styles: React.CSSProperties = {
  margin: '0px',
  fontSize: '15px',
  fontWeight: 200,
};

const imgStyles: React.CSSProperties = {
  height: '17px',
  width: '17px',
};

export default Filters;
