import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
        <CheckingDiv
          key="Checking"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <CheckingText>checking {siteNames[choice]}...</CheckingText>
        </CheckingDiv>
      )}
    </AnimatePresence>
  );
};

const CheckingDiv = styled(motion.div)`
  width: 80%;
  height: 35px;
  margin: 20px auto 10px;
`;

const CheckingText = styled.h2`
  font-size: 21px;
  font-family: Manrope;
  font-weight: 600;
  color: #7a6fff;
  text-align: center;
  margin: 0;
`;

export default Checking;
