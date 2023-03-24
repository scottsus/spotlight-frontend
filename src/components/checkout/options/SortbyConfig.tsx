import React from 'react';
import styled from 'styled-components';
import { SortByOptions } from '../../../lib/types/options';

interface ISortBy {
  sortByIsOpen: boolean;
  setSortByIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSortByOptions: React.Dispatch<React.SetStateAction<SortByOptions>>;
  offsetDiv: number;
}

export default function SortByConfig({
  sortByIsOpen,
  setSortByIsOpen,
  setSortByOptions,
  offsetDiv,
}: ISortBy) {
  const closeSortBy = () => setSortByIsOpen(false);
  return (
    <SortByDiv isOpen={sortByIsOpen} offsetDiv={offsetDiv}>
      {/* TODO: SORTING USING OTHER THINGS
          <SortbyItem text="Trending" setSortByOptions={setSortByOptions} />
          <SortbyItem text="Recommended" setSortByOptions={setSortByOptions} />
          <SortbyItem text="Section" setSortByOptions={setSortByOptions} /> */}
      <SortbyItem
        text="Price: Low-High"
        setSortByOptions={setSortByOptions}
        closeSortBy={closeSortBy}
      />
      <SortbyItem
        text="Price: High-Low"
        setSortByOptions={setSortByOptions}
        closeSortBy={closeSortBy}
      />
    </SortByDiv>
  );
}

interface ISortByDiv {
  isOpen: boolean;
  offsetDiv: number;
}

const SortByDiv = styled.div<ISortByDiv>`
  position: absolute;
  top: ${(props) => (props.isOpen ? 212 : -1000)}px;
  left: ${(props) => props.offsetDiv}px;
  border: 1.5px solid #4b3bff;
  border-radius: 5px;
  padding: 4px 10px;
  z-index: 103;
  background-color: #ffffff;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
`;

interface ISortByItem {
  text: string;
  closeSortBy: () => void;
  setSortByOptions: React.Dispatch<React.SetStateAction<SortByOptions>>;
}

function SortbyItem({ text, closeSortBy, setSortByOptions }: ISortByItem) {
  const saveSortByOption = () => {
    if (text === 'Price: High-Low') setSortByOptions({ isAscending: false });
    else setSortByOptions({ isAscending: true });
    closeSortBy();
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
