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
      setChoice((choice) => choice + 1);
      if (choice === siteNames.length - 1) setChoice(0);
    }, 2000);
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
            animate={{
              backgroundColor: ['#000000', '#FFFFFF'],
            }}
            transition={{
              times: [0, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <h1 style={h1Styles}>Checking {siteNames[choice]}...</h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const checkingStyles: React.CSSProperties = {
  height: '27px',
  width: '60%',
  margin: '0px 0px',
};

const pillStyles: React.CSSProperties = {
  height: '27px',
  width: '80%',
  margin: '0px auto',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1002,
};

const h1Styles: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 600,
};

export default Checking;
