import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import siteNames from '../../lib/sitenames';

interface IChecking {
  hasLoadedAll: boolean;
}

const Checking: React.FC<IChecking> = ({ hasLoadedAll }) => {
  const [choice, setChoice] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setChoice((choice) => (choice + 1) % siteNames.length);
      if (choice === siteNames.length - 1) setChoice(0);
    }, 4000);
    return () => clearInterval(interval);
  });
  return (
    <AnimatePresence>
      {!hasLoadedAll && (
        <motion.div
          key='checking'
          style={checkingStyles}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            key='pill'
            style={pillStyles}
            // TODO: animating background colors
          >
            <h1 style={h1Styles}>Checking {siteNames[choice]}...</h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const checkingStyles: React.CSSProperties = {
  height: '35px',
  width: '80%',
  margin: '25px auto 20px',
};

const pillStyles: React.CSSProperties = {
  height: '35px',
  width: '275px',
  margin: '0px auto',
  padding: '9px 32px',
  borderRadius: '38px',
  backgroundColor: '#7A6FFF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1002,
};

const h1Styles: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#FFFFFF',
};

export default Checking;
