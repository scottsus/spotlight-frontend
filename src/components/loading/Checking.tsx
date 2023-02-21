import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

function Checking() {
  const [choice, setChoice] = useState(0);
  const checkingLines = [
    '👀 looking for the best deals...',
    '⏰ this might take up to 40s...',
    '🏀 checking Crypto.com Arena...',
    '🎤 asking Taylor Swift...',
    '🗑 looking through the trash...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setChoice((choice) => (choice + 1) % checkingLines.length);
    }, 4000);
    return () => clearInterval(interval);
  });

  return (
    <CheckingDiv>
      <CheckingText text={checkingLines[choice]} />
    </CheckingDiv>
  );
}

const CheckingDiv = styled.div`
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
        {text}
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
