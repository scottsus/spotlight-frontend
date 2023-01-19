import React, { useState } from 'react';
import styled from 'styled-components';
import SortByConfig from './SortbyConfig';
import FiltersConfig from './FiltersConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronUp,
  faChevronDown,
} from '@fortawesome/fontawesome-free-solid';

export default function Options() {
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
    <OptionsDiv>
      <Button width="84px" onClick={toggleFiltersConfig}>
        <img src={chrome.runtime.getURL('imgs/filter.png')} style={imgStyles} />
        <ButtonText>Filters</ButtonText>
      </Button>
      <FiltersConfig
        filterConfigIsOpen={filterConfigIsOpen}
        toggle={toggleFiltersConfig}
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
      <SortByConfig sortByIsOpen={sortByIsOpen} />
    </OptionsDiv>
  );
}

const OptionsDiv = styled.div`
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
`;

const ButtonText = styled.p`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 400;
  color: #4b3bff;
  margin: 0;
`;

const imgStyles: React.CSSProperties = {
  height: '17px',
  width: '17px',
  marginRight: '5px',
};
