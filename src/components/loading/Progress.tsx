import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface IProgressBar {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isDoneWithProgressBar: boolean;
  setIsDoneWithProgressBar: React.Dispatch<React.SetStateAction<boolean>>;
  hasLoadedAll: boolean;
}

export default function ProgressBar({
  progress,
  setProgress,
  isDoneWithProgressBar,
  setIsDoneWithProgressBar,
  hasLoadedAll,
}: IProgressBar) {
  useEffect(() => {
    if (hasLoadedAll) {
      const interval = setInterval(() => {
        setProgress((progress) => progress + 1);
        if (progress >= 30) {
          setIsDoneWithProgressBar(true);
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }

    const interval = setInterval(() => {
      if (progress < 30) setProgress((progress) => progress + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [hasLoadedAll, progress]);

  return (
    <ProgressBarDiv
      key="ProgressBar"
      width={progress}
      isDone={isDoneWithProgressBar}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8 }}
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
  transition: background-color 0.5s ease-in-out;
`;
