import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';

interface IFilterConfig {
  filterConfigIsOpen: boolean;
  toggle: () => void;
}

export default function FiltersConfig({
  filterConfigIsOpen,
  toggle,
}: IFilterConfig) {
  const numberList = ['Any', '1', '2', '3', '4', '5', '6', '7', '8', '9+'];
  const websitesList = ['Any', 'Ticketmaster', 'SeatGeek', 'Stubhub'];
  const leftArrow = faAngleLeft as IconProp;
  return (
    <AnimatePresence>
      {filterConfigIsOpen && (
        <FilterConfigDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <FilterHeader>
            <Black>Price Range:</Black>
            &ensp;
            <Purple>$100 - $1,100</Purple>
          </FilterHeader>
          <SliderContainer>
            <Box content={'$100'} isClickable={false} />
            <img
              src={chrome.runtime.getURL('imgs/range-slider.png')}
              alt="range slider"
              style={imgStyles}
            />
            <Box content={'$1,100'} isClickable={false} />
          </SliderContainer>

          <FilterHeader>
            <Black>Number of Tickets:</Black>
            &ensp;
            <Purple>2</Purple>
          </FilterHeader>
          <Boxes contentList={numberList} />

          <FilterHeader>
            <Black>Websites:</Black>
            &ensp;
            <Purple>Ticketmaster, SeatGeek</Purple>
          </FilterHeader>
          <Boxes contentList={websitesList} />

          <Buttons>
            <BackButton onClick={toggle}>
              <ButtonText color="#27292a">
                <FontAwesomeIcon icon={leftArrow} /> &thinsp; Back to Listings
              </ButtonText>
            </BackButton>
            <ApplyButton>
              <ButtonText color="#FFFFFF">Apply Changes</ButtonText>
            </ApplyButton>
          </Buttons>
        </FilterConfigDiv>
      )}
    </AnimatePresence>
  );
}

const FilterConfigDiv = styled(motion.div)`
  position: absolute;
  top: 211px;
  left: 31px;
  z-index: 101;
  border: 1.5px solid #4b3bff;
  border-radius: 10.6px;
  height: 372px;
  width: 509px;
  padding: 10px 37px 20px;
  background-color: #ffffff;
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

const SliderContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const imgStyles: React.CSSProperties = {
  height: '36px',
  width: '64%',
};

const Buttons = styled.div`
  margin: 20px auto;
  width: 90%;
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

interface IBoxes {
  contentList: string[];
}

function Boxes({ contentList }: IBoxes) {
  const boxes = contentList.map((content) => (
    <Box key={content} content={content} isClickable={true} />
  ));
  return <BoxesDiv>{boxes}</BoxesDiv>;
}

const BoxesDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
