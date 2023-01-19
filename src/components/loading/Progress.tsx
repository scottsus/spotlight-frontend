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
    <AnimatePresence>
      {!isDoneWithProgressBar && (
        <ProgressBarDiv
          key="ProgressBar"
          width={progress}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8 }}
        />
      )}
    </AnimatePresence>
  );
}

const ProgressBarDiv = styled(motion.div)<{ width: number }>`
  width: ${(props) => (props.width * 98.0) / 30}%;
  height: 6px;
  border-radius: 2px;
  background-color: #4b3bff;
`;
