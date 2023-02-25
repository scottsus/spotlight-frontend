import React, { useState } from 'react';
import styled from 'styled-components';

import { FilterOptions } from '../../lib/options';
import Box from './Box';
import RangeSlider from './RangeSlider';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IFilterConfig {
  filterConfigIsOpen: boolean;
  toggle: () => void;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export default function FiltersConfig({
  filterConfigIsOpen,
  toggle,
  setFilterOptions,
}: IFilterConfig) {
  const leftArrow = faAngleLeft as IconProp;

  const min = 0,
    max = 3000;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const numberList = ['Any', '1', '2', '3', '4', '5', '6', '7', '8', '9+'];
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>(['Any']);

  const websitesList = ['Any', 'Ticketmaster', 'SeatGeek', 'StubHub'];
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>(['Any']);

  const saveFilterOptions = () => {
    setFilterOptions({
      minPrice: minVal,
      maxPrice: maxVal,
      numTicketsArr: selectedNumbers,
      chosenWebsites: selectedWebsites,
    });
    toggle();
  };
  return (
    <FilterConfigDiv isOpen={filterConfigIsOpen}>
      <FilterHeader>
        <Black>Price Range:</Black>
        &ensp;
        <Purple>
          ${minVal} - ${maxVal}
        </Purple>
      </FilterHeader>
      <RangeSlider
        min={min}
        max={max}
        minVal={minVal}
        maxVal={maxVal}
        setMinVal={setMinVal}
        setMaxVal={setMaxVal}
      />
      <FilterHeader>
        <Black>Number of Tickets:</Black>
        &ensp;
        <Purple>{selectedNumbers.join(', ')}</Purple>
      </FilterHeader>
      <Boxes contentList={numberList} setContents={setSelectedNumbers} />

      <FilterHeader>
        <Black>Websites:</Black>
        &ensp;
        <Purple>{selectedWebsites.join(', ')}</Purple>
      </FilterHeader>
      <Boxes contentList={websitesList} setContents={setSelectedWebsites} />

      <Buttons>
        <BackButton onClick={toggle}>
          <ButtonText color="#27292a">
            <FontAwesomeIcon icon={leftArrow} /> &thinsp; Back to Listings
          </ButtonText>
        </BackButton>
        <ApplyButton onClick={saveFilterOptions}>
          <ButtonText color="#FFFFFF">Apply Changes</ButtonText>
        </ApplyButton>
      </Buttons>
    </FilterConfigDiv>
  );
}

const FilterConfigDiv = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: ${(props) => (props.isOpen ? '220px' : '-1000px')};
  left: 31px;
  z-index: 101;
  border: 1.05px solid #4b3bff;
  border-radius: 10px;
  height: 360px;
  width: 509px;
  padding: 10px 37px 20px;
  background-color: #ffffff;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
`;

const FilterHeader = styled.div`
  margin-top: 16px;
`;

const headerText = `
  display: inline;
  font-size: 16px;
  font-family: Manrope;
`;

const Black = styled.h2`
  ${headerText}
  font-weight: 700;
  color: #000000;
`;

const Purple = styled.h2`
  ${headerText}
  font-weight: 400;
  color: #4b3bff;
`;

interface IBoxes {
  contentList: string[] | number[];
  setContents?: React.Dispatch<React.SetStateAction<any>>;
}

function Boxes({ contentList, setContents }: IBoxes) {
  const boxes = contentList.map((content) => (
    <Box
      key={content}
      content={content}
      isActiveInitially={content === 'Any' ? true : false}
      isClickable={true}
      setContents={setContents}
    />
  ));
  return <BoxesDiv>{boxes}</BoxesDiv>;
}

const BoxesDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Buttons = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  background-color: transparent;
  padding: 11px 24px;
  border-radius: 20px;
  :hover {
    background-color: #d9d9d9;
    transition: 0.2s ease;
  }
`;

const ApplyButton = styled.button`
  background-color: #4b3bff;
  padding: 11px 24px;
  border-radius: 20px;
  :hover {
    background-color: #695cff;
  }
`;

const ButtonText = styled.p<{ color: string }>`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 500;
  color: ${(props) => props.color};
  margin: 0;
`;
