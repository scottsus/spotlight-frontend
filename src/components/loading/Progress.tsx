import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

interface IProgress {
  hasLoadedAll: boolean;
}

const Progress: React.FC<IProgress> = ({ hasLoadedAll }) => {
  const [progress, setProgress] = useState(0);
  const [isDoneWithProgressBar, setIsDoneWithProgressBar] = useState(false);
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
        <motion.div
          key='progressBar'
          style={progressStyles}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8 }}
        >
          <style>{progressStyle}</style>
          <ProgressBar animated now={(progress * 100.0) / 30} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const progressStyle: string = `
.progress {
  height: 27px;
  width: 100%;
  margin-right: 40px;
}
`;

const progressStyles: React.CSSProperties = {
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
};

export default Progress;
