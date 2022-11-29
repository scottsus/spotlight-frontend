import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonBlock: React.FC = () => {
  return (
    <div style={skeletonBlockStyles}>
      <div style={squareBlockStyles}>
        <Skeleton height={20} width={20} baseColor='#DEDBFF' />
      </div>
      <Skeleton height={50} width={50} baseColor='#D2CEFF' />
      <div style={twoSkeletonStyles}>
        <Skeleton height={20} width={120} baseColor='#DEDBFF' />
        <Skeleton height={20} width={100} baseColor='#EDECff' />
      </div>
      <Skeleton height={50} width={100} baseColor='#D6D2FF' />
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
