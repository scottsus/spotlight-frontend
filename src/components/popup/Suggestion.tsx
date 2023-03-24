import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from '../general/Divider';

interface ISuggestion {
  thumbnailUrl: string;
  performer: string;
  venue: string;
  date: string;
  time: string;
  ticketHrefs: string[];
  minPrices: number[];
}

export default function Suggestion({
  thumbnailUrl,
  performer,
  venue,
  date,
  time,
  ticketHrefs,
  minPrices,
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
      <OpenSuggestionBlock
        isOpen={isOpen}
        ticketHrefs={ticketHrefs}
        minPrices={minPrices}
      />
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
  color: #27292a;

  .fa-chevron-down {
    font-size: 11px;
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
  border: 1.4px solid #d9d9d9;
  border-radius: 30px;
  margin: 0 17.5px 0 0;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

const Performer = styled.h2`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 500;
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
  ticketHrefs: string[];
  minPrices: number[];
}

function OpenSuggestionBlock({
  isOpen,
  ticketHrefs,
  minPrices,
}: IOpenSuggestionBlock) {
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
          hoverColor="#2D1356"
          startingPrice={68}
          ticketHref={ticketHrefs[0]}
          minPrice={minPrices[0]}
        />
        <WebsiteButton
          logoUrl="imgs/websiteButtons/gametime.png"
          logoWidth={72}
          logoHeight={13}
          backgroundColor="#19ce85"
          hoverColor="#11AF6F"
          startingPrice={150}
          ticketHref={ticketHrefs[1]}
          minPrice={minPrices[1]}
        />
        <WebsiteButton
          logoUrl="imgs/websiteButtons/seatgeek.png"
          logoWidth={38}
          logoHeight={27}
          backgroundColor="#ff5b49"
          hoverColor="#C33C2D"
          startingPrice={102}
          ticketHref={ticketHrefs[2]}
          minPrice={minPrices[2]}
        />
        <WebsiteButton
          logoUrl="imgs/websiteButtons/ticketmaster.png"
          logoWidth={90}
          logoHeight={13}
          backgroundColor="#026CDF"
          hoverColor="#0250A4"
          startingPrice={102}
          ticketHref={ticketHrefs[3]}
          minPrice={minPrices[3]}
        />
        <WebsiteButton
          logoUrl="imgs/websiteButtons/tickpick.png"
          logoWidth={80}
          logoHeight={17}
          backgroundColor="#2E90FF"
          hoverColor="#2470C6"
          startingPrice={102}
          ticketHref={ticketHrefs[4]}
          minPrice={minPrices[4]}
        />
        <WebsiteButton
          logoUrl="imgs/websiteButtons/vividseats.png"
          logoWidth={85}
          logoHeight={20}
          backgroundColor="#0983B6"
          hoverColor="#0F719A"
          startingPrice={102}
          ticketHref={ticketHrefs[5]}
          minPrice={minPrices[5]}
        />
        <WebsiteButton
          logoUrl="imgs/websiteButtons/axs.png"
          logoWidth={47}
          logoHeight={20}
          backgroundColor="#0855A2"
          hoverColor="#0B4580"
          startingPrice={102}
          ticketHref={ticketHrefs[6]}
          minPrice={minPrices[6]}
        />
        <WebsiteButton
          logoUrl="imgs/websiteButtons/ticketiq.png"
          logoWidth={68}
          logoHeight={15}
          backgroundColor="#2C2474"
          hoverColor="#1F1951"
          startingPrice={102}
          ticketHref={ticketHrefs[7]}
          minPrice={minPrices[7]}
        />
        {/* <NextButton>
          <RightArrow src={chrome.runtime.getURL('imgs/rightAngleArrow.svg')} />
        </NextButton> */}
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
  overflow-x: scroll;
`;

interface IWebsiteButton {
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  backgroundColor: string;
  hoverColor: string;
  startingPrice: number;
  ticketHref: string;
  minPrice: number;
}

function WebsiteButton({
  logoUrl,
  logoWidth,
  logoHeight,
  backgroundColor,
  hoverColor,
  ticketHref,
  minPrice,
}: IWebsiteButton) {
  return (
    <WebsiteButtonDiv>
      <a href={ticketHref} target="_blank">
        <ColorPortion backgroundColor={backgroundColor} hoverColor={hoverColor}>
          <WebsiteLogo
            src={chrome.runtime.getURL(logoUrl)}
            width={logoWidth}
            height={logoHeight}
          />
        </ColorPortion>
        <TextPortion className="textPortion">
          <StartingPrice className="startingPrice">
            From ${minPrice.toFixed(0)}
          </StartingPrice>
        </TextPortion>
      </a>
    </WebsiteButtonDiv>
  );
}

const WebsiteButtonDiv = styled.div`
  width: 125px;
  height: 105px;
  border: 1.5px solid #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 21px 0 0;
  flex-shrink: 0;
  :hover {
    .startingPrice {
      color: #4b3bff;
    }
  }
`;

interface IColorPortion {
  backgroundColor: string;
  hoverColor: string;
}

const ColorPortion = styled.div<IColorPortion>`
  height: 70px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: ${(props) => props.hoverColor};
  }
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
