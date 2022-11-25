import React from 'react';
import SkeletonBlock from './SkeletonBlock';
import 'react-loading-skeleton/dist/skeleton.css';

const Skeletons = () => {
  return (
    <div style={skeletonsStyles}>
      <SkeletonBlock />
      <SkeletonBlock />
      <SkeletonBlock />
      <SkeletonBlock />
    </div>
  );
};

const skeletonsStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export default Skeletons;
