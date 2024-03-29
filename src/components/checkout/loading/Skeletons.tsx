import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Skeletons() {
  return (
    <SkeletonsDiv>
      <SkeletonBlock />
      <SkeletonBlock />
      <SkeletonBlock />
      <SkeletonBlock />
    </SkeletonsDiv>
  );
}

const SkeletonsDiv = styled.div`
  height: 64%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: -30px 0 auto;
`;

function SkeletonBlock() {
  return (
    <SkeletonBlockDiv>
      <SquareBlock>
        <Skeleton height={20} width={20} baseColor="#F2F3F5" />
      </SquareBlock>

      <Skeleton height={50} width={50} baseColor="#EEEFF2" />

      <TwoSkeletons>
        <Skeleton height={20} width={150} baseColor="#F2F3F5" />
        <Skeleton height={20} width={100} baseColor="#F6F7F8" />
      </TwoSkeletons>

      <Skeleton height={50} width={160} baseColor="#F2F3F5" />
    </SkeletonBlockDiv>
  );
}

const SkeletonBlockDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: space-evenly;
`;

const SquareBlock = styled.div`
  margin: auto 0;
  width: 20px;
  height: 20px;
`;

const TwoSkeletons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
