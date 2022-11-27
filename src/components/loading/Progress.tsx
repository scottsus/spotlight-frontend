import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Progress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 30) setProgress((progress) => progress + 0.1);
    }, 100);
    return () => clearInterval(interval);
  });
  return (
    <div style={progressStyles}>
      <ProgressBar animated now={(progress * 100.0) / 30} />
    </div>
  );
};

const progressStyles: React.CSSProperties = {
  margin: 'auto',
  width: '80%',
};

export default Progress;
