import { faChevronDown } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ISuggestion {
  thumbnailUrl: string;
  performer: string;
  venue: string;
  date: string;
  time: string;
}

export default function Suggestion({
  thumbnailUrl,
  performer,
  venue,
  date,
  time,
}: ISuggestion) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(80);
  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  useEffect(() => {
    if (isOpen) setHeight(260);
    else setHeight(80);
  });
  return (
    <SuggestionContainer height={height}>
      <SuggestionBlock
        isOpen={isOpen}
        toggle={toggle}
        thumbnailUrl={thumbnailUrl}
        performer={performer}
        venue={venue}
        date={date}
        time={time}
      />
      <OpenSuggestionBlock isOpen={isOpen} />
    </SuggestionContainer>
  );
}

const SuggestionContainer = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  border: 1.5px solid #d9d9d9;
  border-radius: 10.6px;
  margin: 0 0 10px 0;
  transition: height 0.2s ease-in-out;
  overflow: hidden;
`;

interface ISuggestionBlock {
  isOpen: boolean;
  toggle: () => void;
  thumbnailUrl: string;
  performer: string;
  venue: string;
  date: string;
  time: string;
}

function SuggestionBlock({
  isOpen,
  toggle,
  thumbnailUrl,
  performer,
  venue,
  date,
  time,
}: ISuggestionBlock) {
  const down = faChevronDown as IconProp;
  return (
    <SuggestionBlockDiv onClick={toggle}>
      <ArrowButton>
        <FontAwesomeIcon
          icon={down}
          className={isOpen ? 'fa-chevron-down open' : 'fa-chevron-down'}
        />
      </ArrowButton>
      <Thumbnail src={chrome.runtime.getURL(thumbnailUrl)} />
      <Title>
        <Performer>{performer}</Performer>
        <Venue>{venue}</Venue>
      </Title>
      <DateAndTime>
        <Date>{date}</Date>
        <Time>{time}</Time>
      </DateAndTime>
    </SuggestionBlockDiv>
  );
}

const SuggestionBlockDiv = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #ebe9ff;
  }
`;

const ArrowButton = styled.button`
  width: 14px;
  height: 16px;
  margin: 0 20px 0 20px;
  padding: 0;
  border: none;
  background-color: transparent;
  color: #4b3bff;

  .fa-chevron-down {
    transform: rotate(0deg);
    transition: transform 0.6s ease;
  }

  .fa-chevron-down.open {
    transform: rotate(-180deg);
    transition: transform 0.6s ease;
  }
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  margin: 0 17.5px 0 0;
  //   display: inline;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

const Performer = styled.h2`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 600;
  color: #27292a;
`;

const Venue = styled.h3`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 300;
  color: #27292a;
`;

const DateAndTime = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 20px auto auto;
  text-align: right;
`;

const Date = styled.p`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 300;
  color: #8c8b94;
`;

const Time = styled.p`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 300;
  color: #8c8b94;
`;

interface IOpenSuggestionBlock {
  isOpen: boolean;
}

function OpenSuggestionBlock({ isOpen }: IOpenSuggestionBlock) {
  const [height, setHeight] = useState(0);
  const [openOverflow, setOpenOverflow] = useState('hidden');
  useEffect(() => {
    if (isOpen) {
      setHeight(180);
      setOpenOverflow('visible');
    } else {
      setHeight(0);
      setOpenOverflow('hidden');
    }
  });
  return (
    <OpenSuggestionBlockDiv height={height} overflow={openOverflow}>
      <Divider />
      <TicketsAvailable>
        Tickets available on <Purple>8</Purple> websites:
      </TicketsAvailable>
      <Carousell>
        <WebsiteButton
          logoUrl="imgs/websiteButtons/stubhub.png"
          logoWidth={68}
          logoHeight={32}
          backgroundColor="#3f1d75"
          startingPrice={68}
        />
        <WebsiteButton
          logoUrl="imgs/websiteButtons/gametime.png"
          logoWidth={72}
          logoHeight={13}
          backgroundColor="#19ce85"
          startingPrice={150}
        />
        <WebsiteButton
          logoUrl="imgs/websiteButtons/seatgeek.png"
          logoWidth={38}
          logoHeight={27}
          backgroundColor="#ff5b49"
          startingPrice={102}
        />
        <NextButton>
          <RightArrow src={chrome.runtime.getURL('imgs/rightAngleArrow.svg')} />
        </NextButton>
      </Carousell>
    </OpenSuggestionBlockDiv>
  );
}

interface IOpenSuggestionBlockDiv {
  height: number;
  overflow: string;
}

const OpenSuggestionBlockDiv = styled.div<IOpenSuggestionBlockDiv>`
  position: static;
  height: ${(props) => props.height}px;
  overflow: ${(props) => props.overflow};
  transition: height 0.2s ease-in-out;
`;

const Divider = styled.div`
  height: 2px;
  background-color: #d9d9d9;
`;

const TicketsAvailable = styled.h3`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 500;
  color: #27292a;
  margin: 20px auto 0 36px;
`;

const Purple = styled.span`
  font-weight: 600;
  color: #4b3bff;
`;

const Carousell = styled.div`
  width: 450px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 20px 36px;
`;

const NextButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #eeeeee;
  :hover {
    background-color: #cbcbcb;
  }
`;

const RightArrow = styled.img`
  width: 6px;
  height: 12px;
`;

interface IWebsiteButton {
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  backgroundColor: string;
  startingPrice: number;
}

function WebsiteButton({
  logoUrl,
  logoWidth,
  logoHeight,
  backgroundColor,
  startingPrice,
}: IWebsiteButton) {
  return (
    <WebsiteButtonDiv>
      <ColorPortion backgroundColor={backgroundColor}>
        <WebsiteLogo
          src={chrome.runtime.getURL(logoUrl)}
          width={logoWidth}
          height={logoHeight}
        />
      </ColorPortion>
      <TextPortion>
        <StartingPrice>From ${startingPrice}</StartingPrice>
      </TextPortion>
    </WebsiteButtonDiv>
  );
}

const WebsiteButtonDiv = styled.div`
  width: 125px;
  height: 105px;
  border: 1.5px solid #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
`;

const ColorPortion = styled.div<{ backgroundColor: string }>`
  height: 70px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IWebsiteLogo {
  width: number;
  height: number;
}

const WebsiteLogo = styled.img<IWebsiteLogo>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const TextPortion = styled.div`
  height: 32px;
  background-color: #ffffff;
  padding: 5px 20px;
`;

const StartingPrice = styled.h3`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 400;
  color: #27292a;
  text-align: center;
`;
