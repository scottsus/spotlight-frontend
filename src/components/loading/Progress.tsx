import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IProgressBar {
  isDoneWithProgressBar: boolean;
  setIsDoneWithProgressBar: React.Dispatch<React.SetStateAction<boolean>>;
  hasLoadedAll: boolean;
}

export default function ProgressBar({
  isDoneWithProgressBar,
  setIsDoneWithProgressBar,
  hasLoadedAll,
}: IProgressBar) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (progress >= 36) return;
    const interval = setInterval(() => {
      if (hasLoadedAll) {
        setProgress((progress) => progress + 2.5);
        if (progress >= 30) {
          setIsDoneWithProgressBar(true);
          return clearInterval(interval);
        }
      } else if (progress < 30) setProgress((progress) => progress + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [hasLoadedAll, progress]);

  return (
    <ProgressBarDiv
      key="ProgressBar"
      width={progress}
      isDone={isDoneWithProgressBar}
    />
  );
}

interface IProgressBarDiv {
  width: number;
  isDone: boolean;
}

const ProgressBarDiv = styled(motion.div)<IProgressBarDiv>`
  width: ${(props) => (props.width * 80.0) / 30}%;
  height: 6px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDone ? 'transparent' : '#4b3bff')};
  transition: background-color 1.8s ease-in-out;
`;
