import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonBlock: React.FC = () => {
  return (
    <div style={skeletonBlockStyles}>
      <Skeleton height={30} width={30} />
      <Skeleton height={50} width={50} />
      <div style={twoSkeletonStyles}>
        <Skeleton height={20} width={80} />
        <Skeleton height={20} width={60} />
      </div>
      <Skeleton height={50} width={80} />
    </div>
  );
};

const skeletonBlockStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-evenly',
};

const twoSkeletonStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export default SkeletonBlock;
