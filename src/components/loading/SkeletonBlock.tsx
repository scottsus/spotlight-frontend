import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonBlock: React.FC = () => {
  return (
    <div style={skeletonBlockStyles}>
      <div style={squareBlockStyles}>
        <Skeleton height={20} width={20} />
      </div>
      <Skeleton height={50} width={50} />
      <div style={twoSkeletonStyles}>
        <Skeleton height={20} width={120} />
        <Skeleton height={20} width={100} />
      </div>
      <Skeleton height={50} width={100} />
    </div>
  );
};

const skeletonBlockStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'space-evenly',
};

const squareBlockStyles: React.CSSProperties = {
  margin: 'auto 0px',
  height: '20px',
  width: '20px',
};

const twoSkeletonStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export default SkeletonBlock;
