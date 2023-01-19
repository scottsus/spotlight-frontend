import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ISkeletons {
  hasLoadedOne: boolean;
}

export default function Skeletons({ hasLoadedOne }: ISkeletons) {
  return (
    <AnimatePresence>
      {!hasLoadedOne && (
        <SkeletonsDiv
          key="Skeletons"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <SkeletonBlock />
          <SkeletonBlock />
          <SkeletonBlock />
          <SkeletonBlock />
        </SkeletonsDiv>
      )}
    </AnimatePresence>
  );
}

const SkeletonsDiv = styled(motion.div)`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0;
`;

function SkeletonBlock() {
  return (
    <SkeletonBlockDiv>
      <SquareBlock>
        <Skeleton height={20} width={20} baseColor="#DEDBFF" />
      </SquareBlock>

      <Skeleton height={50} width={50} baseColor="#D2CEFF" />

      <TwoSkeletons>
        <Skeleton height={20} width={120} baseColor="#DEDBFF" />
        <Skeleton height={20} width={100} baseColor="#EDECff" />
      </TwoSkeletons>

      <Skeleton height={50} width={100} baseColor="#D6D2FF" />
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
