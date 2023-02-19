import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { FilterOptions, SortByOptions } from '../../lib/options';
import SortByConfig from './SortbyConfig';
import FiltersConfig from './FiltersConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronUp,
  faChevronDown,
} from '@fortawesome/fontawesome-free-solid';

interface IOptions {
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  setSortByOptions: React.Dispatch<React.SetStateAction<SortByOptions>>;
}

export default function Options({
  setFilterOptions,
  setSortByOptions,
}: IOptions) {
  const [filterConfigIsOpen, setFilterConfigIsOpen] = useState(false);
  const [sortByIsOpen, setsortByIsOpen] = useState(false);
  const up = faChevronUp as IconProp;
  const down = faChevronDown as IconProp;

  const toggleFiltersConfig = () => {
    setFilterConfigIsOpen((filterConfigIsOpen) => !filterConfigIsOpen);
  };

  const toggleSortBy = () => {
    setsortByIsOpen((sortByIsOpen) => !sortByIsOpen);
  };
  return (
    <OptionsDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
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
          Sort By &thinsp; <FontAwesomeIcon icon={sortByIsOpen ? up : down} />
        </ButtonText>
      </Button>
      <SortByConfig
        sortByIsOpen={sortByIsOpen}
        setSortByOptions={setSortByOptions}
      />
    </OptionsDiv>
  );
}

const OptionsDiv = styled(motion.div)`
  color: #4b3bff;
  margin: 10px 0;
  display: flex;
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
`;

const Image = styled.img`
  width: 17px;
  height: 17px;
  margin: 0 5px 0 0;
`;
