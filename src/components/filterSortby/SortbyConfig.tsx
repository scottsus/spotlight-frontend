import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SortbyItem from './SortbyItem';

const SortbyConfig = ({ sortbyIsOpen }) => {
  return (
    <AnimatePresence>
      {sortbyIsOpen && (
        <motion.div
          style={sortbyConfigStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SortbyItem text='Trending' />
          <SortbyItem text='Recommended' />
          <SortbyItem text='Section' />
          <SortbyItem text='Price: Low to High' />
          <SortbyItem text='Price: High to Low' />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const sortbyConfigStyles: React.CSSProperties = {
  top: '210px',
  left: '125px',
  height: '175px',
  width: '165px',
  position: 'absolute',
  border: '1.5px solid #4B3BFF',
  borderRadius: '5px',
  backgroundColor: '#FFFFFF',
  padding: '8px 9px',
  zIndex: 1003,
};

export default SortbyConfig;
