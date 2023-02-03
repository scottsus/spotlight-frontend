import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import siteNames from '../../lib/sitenames';

interface IChecking {
  hasLoadedAll: boolean;
}

function Checking({ hasLoadedAll }: IChecking) {
  const [choice, setChoice] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChoice((choice) => (choice + 1) % siteNames.length);
    }, 2000);
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
          <CheckingText text={siteNames[choice]} />
        </CheckingDiv>
      )}
    </AnimatePresence>
  );
}

const CheckingDiv = styled(motion.div)`
  width: 80%;
  height: 35px;
  margin: 20px auto;
`;

interface ICheckingText {
  text: string;
}

function CheckingText({ text }: ICheckingText) {
  useEffect(() => {}, [text]);
  return (
    <AnimatePresence>
      <CheckingTextDiv
      // key={text}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      // transition={{ duration: 0.5, delay: 1.0 }}
      >
        checking {text}...
      </CheckingTextDiv>
      ;
    </AnimatePresence>
  );
}

const CheckingTextDiv = styled(motion.div)`
  font-size: 21px;
  font-family: Manrope;
  font-weight: 600;
  color: #7a6fff;
  text-align: center;
  margin: 0;
`;

export default React.memo(Checking);
