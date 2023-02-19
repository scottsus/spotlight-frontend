import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import SortByOptions from '../../lib/sortByOptions';

interface ISortBy {
  sortByIsOpen: boolean;
  setSortByOptions: React.Dispatch<React.SetStateAction<SortByOptions>>;
}

export default function SortByConfig({
  sortByIsOpen,
  setSortByOptions,
}: ISortBy) {
  return (
    <AnimatePresence>
      {sortByIsOpen && (
        <SortByDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <SortbyItem text="Trending" setSortByOptions={setSortByOptions} />
          <SortbyItem text="Recommended" setSortByOptions={setSortByOptions} />
          <SortbyItem text="Section" setSortByOptions={setSortByOptions} />
          <SortbyItem
            text="Price: Low to High"
            setSortByOptions={setSortByOptions}
          />
          <SortbyItem
            text="Price: High to Low"
            setSortByOptions={setSortByOptions}
          />
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
  setSortByOptions: React.Dispatch<React.SetStateAction<SortByOptions>>;
}

function SortbyItem({ text, setSortByOptions }: ISortByItem) {
  const saveSortByOption = () => {
    if (text === 'Price: High to Low') setSortByOptions({ isAscending: false });
    else setSortByOptions({ isAscending: true });
  };
  return (
    <SortByItemDiv onClick={saveSortByOption}>
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
