import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

export default function SortByConfig({ sortByIsOpen }) {
  return (
    <AnimatePresence>
      {sortByIsOpen && (
        <SortByDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SortbyItem text="Trending" />
          <SortbyItem text="Recommended" />
          <SortbyItem text="Section" />
          <SortbyItem text="Price: Low to High" />
          <SortbyItem text="Price: High to Low" />
        </SortByDiv>
      )}
    </AnimatePresence>
  );
}

const SortByDiv = styled(motion.div)`
  position: absolute;
  top: 210px;
  left: 125px;
  width: 180px;
  border: 1.5px solid #4b3bff;
  border-radius: 5px;
  padding: 4px 10px;
  z-index: 103;
  background-color: #ffffff;
`;

interface ISortByItem {
  text: string;
}

function SortbyItem({ text }: ISortByItem) {
  return (
    <SortByItemDiv>
      <SortByItemText>{text}</SortByItemText>
    </SortByItemDiv>
  );
}

const SortByItemDiv = styled.div`
  border-radius: 8px;
  padding: 6px;
  margin: 5px 0;
  cursor: pointer;
  :hover {
    background-color: #f1f1f1;
  }
`;

const SortByItemText = styled.p`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 400;
  margin: 0;
`;
