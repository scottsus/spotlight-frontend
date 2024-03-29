import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { FilterOptions, SortByOptions } from '../../../lib/types/options';
import SortByConfig from './SortbyConfig';
import FiltersConfig from './FiltersConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';

interface IOptions {
  isReady: boolean;
  sortByOptions: SortByOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  setSortByOptions: React.Dispatch<React.SetStateAction<SortByOptions>>;
}

export default function Options({
  isReady,
  sortByOptions,
  setFilterOptions,
  setSortByOptions,
}: IOptions) {
  const [filterConfigIsOpen, setFilterConfigIsOpen] = useState(false);
  const [sortByIsOpen, setSortByIsOpen] = useState(false);
  const [numFiltersApplied, setNumFiltersApplied] = useState(0);
  const down = faChevronDown as IconProp;

  const toggleFiltersConfig = () => {
    setFilterConfigIsOpen((filterConfigIsOpen) => !filterConfigIsOpen);
    setSortByIsOpen(false);
  };

  const toggleSortBy = () => {
    setSortByIsOpen((sortByIsOpen) => !sortByIsOpen);
    setFilterConfigIsOpen(false);
  };

  const showNumFiltersApplied = (numFiltersApplied: number) => {
    if (numFiltersApplied === 0) return '';
    return `(${numFiltersApplied})`;
  };

  const offsetSortByChild = (numFiltersApplied: number) => {
    if (numFiltersApplied === 0) return 130;
    else if (numFiltersApplied === 1) return 154;
    return 156;
  };
  return (
    <OptionsDiv isReady={isReady}>
      <Button width="84px" onClick={toggleFiltersConfig}>
        <Image src={chrome.runtime.getURL('imgs/icons/filter.svg')} />
        <ButtonText>
          Filters {showNumFiltersApplied(numFiltersApplied)}
        </ButtonText>
      </Button>
      <FiltersConfig
        filterConfigIsOpen={filterConfigIsOpen}
        toggle={toggleFiltersConfig}
        setFilterOptions={setFilterOptions}
        setNumFiltersApplied={setNumFiltersApplied}
      />

      <Button
        width="93px"
        onClick={toggleSortBy}
        style={{ marginLeft: '10px' }}
      >
        <ButtonText>
          Sort By:
          {sortByOptions
            ? sortByOptions.isAscending
              ? ' Price: Low-High '
              : ' Price: High-Low '
            : ''}
          &thinsp;
          <FontAwesomeIcon
            icon={down}
            className={
              sortByIsOpen ? 'fa-chevron-down open' : 'fa-chevron-down'
            }
          />
        </ButtonText>
      </Button>
      <SortByConfig
        sortByIsOpen={sortByIsOpen}
        setSortByIsOpen={setSortByIsOpen}
        setSortByOptions={setSortByOptions}
        offsetDiv={offsetSortByChild(numFiltersApplied)}
      />
    </OptionsDiv>
  );
}

const OptionsDiv = styled(motion.div)<{ isReady: boolean }>`
  color: #4b3bff;
  margin: 8px 0 6px;
  display: flex;
  opacity: ${(props) => (props.isReady ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const Button = styled.button<{ width: string }>`
  border: 1.5px solid #4b3bff;
  border-radius: 4.5px;
  height: 28px;
  margin: 0 2.5px 0 0;
  padding: 6px 8px;
  display: flex;
  justify-content: start;
  align-items: center;
  :hover {
    background-color: #ebe9ff;
  }
`;

const ButtonText = styled.p`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 400;
  color: #4b3bff;
  margin: 0;

  .fa-chevron-down {
    font-size: 13px;
    transform: rotate(0deg);
    transition: transform 0.4s ease;
  }

  .fa-chevron-down.open {
    transform: rotate(-180deg);
    transition: transform 0.4s ease;
  }
`;

const Image = styled.img`
  width: 17px;
  height: 17px;
  margin: 0 5px 0 0;
`;
