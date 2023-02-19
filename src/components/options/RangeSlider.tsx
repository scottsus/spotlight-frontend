import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';

interface IRangeSlider {
  min: number;
  max: number;
  onChange: any;
}

export default function RangeSlider({ min, max, onChange }: IRangeSlider) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
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
        console.log(`Width: ${rangeRef.current.style.width}%`);
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);
      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
        console.log(`Width: ${rangeRef.current.style.width}%`);
      }
    }
  }, [maxVal, getPercent]);

  return (
    <SliderContainer>
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
        <LeftValue isOver>{minVal}</LeftValue>
        <RightValue>{maxVal}</RightValue>
      </TrackContainer>
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const disableThumbDefaults = `
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    pointer-events: none;
    position: absolute;
    height: 0;
    width: 200px;
    outline: none;
`;

const chromeWebkit = `
    position: relative;
    background-color: green;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 80px;
    box-shadow: 0 0 1px 1px purple;
    pointer-events: all;
    cursor: pointer;
`;

const LeftThumb = styled.input<{ isOver: boolean }>`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: none;
  position: absolute;
  width: 200px;
  height: 0;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 1px solid #4b3bff;
    pointer-events: all;
  }

  z-index: ${(props) => (props.isOver ? 215 : 213)};
`;

const RightThumb = styled.input`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: none;
  position: absolute;
  width: 200px;
  height: 0;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 1px solid #4b3bff;
    pointer-events: all;
  }

  z-index: 214;
`;

const TrackContainer = styled.div`
  position: relative;
  width: 200px;
`;

const TrackEnds = styled.div`
  border-radius: 3px;
  width: 100%;
  height: 5px;

  background-color: #3f3f3f;
  z-index: 211;
  position: absolute;
`;

const TrackMiddle = styled.div`
  border-radius: 3px;
  height: 5px;

  background-color: #6354ff;
  z-index: 212;
  position: absolute;
`;

const LeftValue = styled.div`
  position: absolute;
  color: aqua;
  font-size: 16px;
  margin-top: 20px;
  left: 6px;
`;

const RightValue = styled.div`
  position: absolute;
  color: aqua;
  font-size: 16px;
  margin-top: 20px;
  right: -4px;
`;
