import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Progress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 30) setProgress((progress) => progress + 0.1);
    }, 100);
    return () => clearInterval(interval);
  });
  return (
    <div id='progressbar' style={progressStyles}>
      <style>{style}</style>
      <ProgressBar animated now={(progress * 100.0) / 30} />
    </div>
  );
};

const style = `
.progress {
  height: 23px;
  width: 80%;
}
`;

const progressStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

export default Progress;
