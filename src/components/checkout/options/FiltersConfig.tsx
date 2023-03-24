import React, { useState } from 'react';
import styled from 'styled-components';

import { FilterOptions } from '../../../lib/types/options';
import RadioBox from '../../general/boxes/RadioBox';
import ChoiceBox from '../../general/boxes/ChoiceBox';
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
  const [selectedNumber, setSelectedNumber] = useState<string | number>('Any');

  const websitesList = [
    `Any`,
    `Ticketmaster`,
    `SeatGeek`,
    `StubHub`,
    `AXS`,
    `VividSeats`,
    `TickPick`,
    'GameTime',
    `TicketIQ`,
  ];
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>(['Any']);

  const saveFilterOptions = () => {
    setFilterOptions({
      minPrice: minVal,
      maxPrice: maxVal,
      numTickets: selectedNumber,
      chosenWebsites: selectedWebsites,
    });
    toggle();
  };
  return (
    <FilterConfigDiv isOpen={filterConfigIsOpen}>
      <Scrollable>
        <FilterHeader style={{ marginBottom: '4px' }}>
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
          <Purple>{selectedNumber}</Purple>
        </FilterHeader>
        <RadioBoxes
          contentList={numberList}
          setSelectedNumber={setSelectedNumber}
        />

        <FilterHeader style={{ marginBottom: '3px' }}>
          <Black>Websites:</Black>
          &ensp;
          <Purple>{selectedWebsites.join(', ')}</Purple>
        </FilterHeader>
        <ChoiceBoxes
          contentList={websitesList}
          setContents={setSelectedWebsites}
        />
      </Scrollable>

      <Buttons>
        <BackButton onClick={toggle}>
          <ButtonText color="#27292a">
            <FontAwesomeIcon icon={leftArrow} /> &thinsp; Back to Listings
          </ButtonText>
        </BackButton>
        <ApplyButton onClick={saveFilterOptions}>
          <ButtonText color="#FFFFFF">Apply Filters</ButtonText>
        </ApplyButton>
      </Buttons>
    </FilterConfigDiv>
  );
}

const FilterConfigDiv = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: ${(props) => (props.isOpen ? '212px' : '-1000px')};
  left: 31px;
  z-index: 101;
  border: 1.5px solid #4b3bff;
  border-radius: 10px;
  height: 365px;
  width: 509px;
  padding: 10px 37px 20px;
  background-color: #ffffff;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
`;

const Scrollable = styled.div`
  height: 250px;
  overflow-y: scroll;
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
  font-weight: 500;
  color: #000000;
`;

const Purple = styled.h2`
  ${headerText}
  font-weight: 400;
  color: #4b3bff;
`;

interface IRadioBoxes {
  contentList: string[] | number[];
  setSelectedNumber: React.Dispatch<React.SetStateAction<any>>;
}

function RadioBoxes({ contentList, setSelectedNumber }: IRadioBoxes) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const currTextContent = event.currentTarget.textContent;
    if (currTextContent === 'Any') {
      setActiveIndex(0);
      return;
    }
    const numTickets = parseInt(currTextContent);
    if (numTickets >= 9) setActiveIndex(9);
    else setActiveIndex(numTickets);
  };

  const boxes = contentList.map((content, idx) => (
    <RadioBox
      key={content}
      content={content}
      index={idx}
      activeIndex={activeIndex}
      handleClick={handleClick}
      setSelectedNumber={setSelectedNumber}
    />
  ));
  return <BoxesDiv justify="space-between">{boxes}</BoxesDiv>;
}

interface IChoiceBoxes {
  contentList: string[] | number[];
  setContents?: React.Dispatch<React.SetStateAction<any>>;
}

function ChoiceBoxes({ contentList, setContents }: IChoiceBoxes) {
  const [activeIndexes, setActiveIndexes] = useState([0]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const websiteMap = {
      Any: 0,
      Ticketmaster: 1,
      SeatGeek: 2,
      StubHub: 3,
      AXS: 4,
      VividSeats: 5,
      TickPick: 6,
      GameTime: 7,
      TicketIQ: 8,
    };

    const currTextContent = event.currentTarget.textContent;

    const index = websiteMap[currTextContent];
    if (index === 0) {
      setActiveIndexes([0]);
      return;
    } else {
      setActiveIndexes((activeIndexes) =>
        activeIndexes.filter((activeIndex) => activeIndex !== 0)
      );
    }

    const checkActiveIndexes = (activeIndexes: number[], index: number) => {
      for (const activeIndex of activeIndexes)
        if (activeIndex === index) return true;
      return false;
    };

    setActiveIndexes((activeIndexes) => {
      const indexIsActive = checkActiveIndexes(activeIndexes, index);
      if (indexIsActive)
        return activeIndexes.filter((activeIndex) => activeIndex !== index);
      return [...activeIndexes, index];
    });
  };

  const boxes = contentList.map((content, idx) => (
    <ChoiceBox
      key={content}
      content={content}
      index={idx}
      activeIndexes={activeIndexes}
      handleClick={handleClick}
      setContents={setContents}
    />
  ));
  return <BoxesDiv justify="start">{boxes}</BoxesDiv>;
}

const BoxesDiv = styled.div<{ justify: string }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => props.justify};
`;

const Buttons = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  background-color: transparent;
  padding: 11px 0;
  border-radius: 20px;

  // TODO
  p {
    :hover {
      color: grey;
      transition: 0.2s ease;
    }
  }
`;

const ApplyButton = styled.button`
  background-color: #4b3bff;
  padding: 11px 30px;
  border-radius: 30px;
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
