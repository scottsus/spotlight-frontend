import React, { useEffect, useState } from 'react';
import { siteNames } from '../../lib/findSportsTickets';
import { motion, AnimatePresence } from 'framer-motion';

const Checking = ({ isLoading }) => {
  const [choice, setChoice] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setChoice((choice) => choice + 1);
      if (choice === siteNames.length - 1) setChoice(0);
    }, 2000);
    return () => clearInterval(interval);
  });
  return (
    <AnimatePresence>
      <motion.div
        style={checkingStyles}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ ...pillBorderStyles, ...pillColorStyles[choice] }}>
          <h1 style={h1Styles}>Checking {siteNames[choice]}...</h1>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const checkingStyles: React.CSSProperties = {
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
};

const pillBorderStyles: React.CSSProperties = {
  width: '80%',
  height: '27px',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 1.0s ease',
};

const pillColorStyles: React.CSSProperties[] = [
  {
    border: '2px solid red',
    backgroundColor: 'pink',
  },
  {
    border: '2px solid orange',
    backgroundColor: 'yellow',
  },
  {
    border: '2px solid blue',
    backgroundColor: 'aquamarine',
  },
  {
    border: '2px solid purple',
    backgroundColor: 'violet',
  },
];

const h1Styles: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 600,
};

export default Checking;
