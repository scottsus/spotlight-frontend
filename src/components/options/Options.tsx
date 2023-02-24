import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { FilterOptions, SortByOptions } from '../../lib/options';
import SortByConfig from './SortbyConfig';
import FiltersConfig from './FiltersConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';

interface IOptions {
  isReady: boolean;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  setSortByOptions: React.Dispatch<React.SetStateAction<SortByOptions>>;
}

export default function Options({
  isReady,
  setFilterOptions,
  setSortByOptions,
}: IOptions) {
  const [filterConfigIsOpen, setFilterConfigIsOpen] = useState(false);
  const [sortByIsOpen, setsortByIsOpen] = useState(false);
  const down = faChevronDown as IconProp;

  const toggleFiltersConfig = () => {
    setFilterConfigIsOpen((filterConfigIsOpen) => !filterConfigIsOpen);
    setsortByIsOpen(false);
  };

  const toggleSortBy = () => {
    setsortByIsOpen((sortByIsOpen) => !sortByIsOpen);
    setFilterConfigIsOpen(false);
  };
  return (
    <OptionsDiv isReady={isReady}>
      <Button width="84px" onClick={toggleFiltersConfig}>
        <Image src={chrome.runtime.getURL('imgs/filter.svg')} alt="Filter" />
        <ButtonText>Filters</ButtonText>
      </Button>
      <FiltersConfig
        filterConfigIsOpen={filterConfigIsOpen}
        toggle={toggleFiltersConfig}
        setFilterOptions={setFilterOptions}
      />

      <Button
        width="93px"
        onClick={toggleSortBy}
        style={{ marginLeft: '10px' }}
      >
        <ButtonText>
          Sort By &thinsp;{' '}
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
        setSortByOptions={setSortByOptions}
      />
    </OptionsDiv>
  );
}

const OptionsDiv = styled(motion.div)<{ isReady: boolean }>`
  color: #4b3bff;
  margin: 10px 0;
  display: flex;
  opacity: ${(props) => (props.isReady ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const Button = styled.button<{ width: string }>`
  border: 1.5px solid #4b3bff;
  border-radius: 4.5px;
  height: 28px;
  width: ${(props) => props.width};
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
