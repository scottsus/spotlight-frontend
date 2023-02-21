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
    if (progress >= 37.5) return;
    const interval = setTimeout(() => {
      if (hasLoadedAll) {
        setProgress((progress) => progress + 0.25);
        if (progress >= 30) {
          setIsDoneWithProgressBar(true);
          return clearInterval(interval);
        }
      } else if (progress < 30) setProgress((progress) => progress + 0.01);
    }, 10);

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

const ProgressBarDiv = styled(motion.div).attrs((props: IProgressBarDiv) => ({
  style: {
    width: `${(props.width * 80.0) / 30}%`,
    backgroundColor: `${props.isDone ? 'transparent' : '#6354ff'}`,
  },
}))`
  height: 6px;
  border-radius: 2px;
  transition: background-color 1.8s ease-in-out;
`;
