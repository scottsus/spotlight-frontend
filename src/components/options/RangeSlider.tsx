import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import Box from './Box';

interface IRangeSlider {
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  setMinVal: React.Dispatch<React.SetStateAction<number>>;
  setMaxVal: React.Dispatch<React.SetStateAction<number>>;
}

export default function RangeSlider({
  min,
  max,
  minVal,
  maxVal,
  setMinVal,
  setMaxVal,
}: IRangeSlider) {
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  const minOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const minVal = Math.min(+event.target.value, maxVal - 1);
    setMinVal(minVal);
    event.target.value = minVal.toString();
  };

  const maxOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maxVal = Math.max(+event.target.value, minVal + 1);
    setMaxVal(maxVal);
    event.target.value = maxVal.toString();
  };

  const getPercent = (rawNumber: number) => {
    return Math.round(((rawNumber - min) / (max - min)) * 100);
  };

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);
      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);
      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <GrandContainer>
      <Box content={`$${minVal.toString()}`} width={70} />
      <RangeSliderContainer>
        <LeftThumb
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={minOnChange}
          isOver={minVal > max - 100}
        />
        <RightThumb
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={maxOnChange}
        />
        <TrackContainer>
          <TrackMiddle ref={rangeRef} />
          <TrackEnds />
        </TrackContainer>
      </RangeSliderContainer>
      <Box content={`$${maxVal.toString()}`} width={70} />
    </GrandContainer>
  );
}

const GrandContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RangeSliderContainer = styled.div`
  height: 30px;
  margin-bottom: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const inputTrackDefaults = `
  width: 280px;
  height: 0;

  position: absolute;
  pointer-events: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
`;

const inputThumbDefaults = `
  ::-webkit-slider-thumb {
    width: 30px;
    height: 30px;
    margin: 7px 0 0 0;
    border-radius: 50%;
    border: 0.5px solid #4b3bff;
    background-color: #ffffff;
  
    position: relative;
    cursor: pointer;
    pointer-events: all;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
`;

const LeftThumb = styled.input<{ isOver: boolean }>`
  ${inputTrackDefaults}
  ${inputThumbDefaults}

  z-index: ${(props) => (props.isOver ? 115 : 113)};
`;

const RightThumb = styled.input`
  ${inputTrackDefaults}
  ${inputThumbDefaults}

  z-index: 114;
`;

const TrackContainer = styled.div`
  position: relative;
  width: 280px;
`;

const trackDefaults = `
  height: 8.5px;
  border-radius: 3px;
  position: absolute;
`;

const TrackEnds = styled.div`
  ${trackDefaults}

  width: 100%;
  background-color: #3f3f3f;
  z-index: 111;
`;

const TrackMiddle = styled.div`
  ${trackDefaults}

  background-color: #6354ff;
  z-index: 112;
`;
