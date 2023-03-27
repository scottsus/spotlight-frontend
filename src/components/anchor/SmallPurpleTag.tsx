import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface ISmallPurpleTag {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SmallPurpleTag({
  tagIsOpened,
  setTagIsOpened,
}: ISmallPurpleTag) {
  const [right, setRight] = useState(-200);
  const [y, setY] = useState(200);
  const [dragY, setDragY] = useState(0);
  const [wasDragged, setWasDragged] = useState(false);

  const getY = async () => {
    const keyVal = await chrome.storage.local.get(`yPos`);
    if (!keyVal[`yPos`]) return 0;

    return keyVal[`yPos`];
  };

  const onDrag = (e: DraggableEvent, data: DraggableData) => {
    setDragY(data.lastY);
    setWasDragged(true);
  };

  const onStop = (e: DraggableEvent, data: DraggableData) => {
    const storeY = async () =>
      await chrome.storage.local.set({ yPos: y + dragY });
    storeY().catch((err) => console.log(err));
  };

  const onClick = () => {
    if (!wasDragged) setTagIsOpened((tagIsOpened) => !tagIsOpened);
    setWasDragged(false);
  };

  useEffect(() => {
    const resetY = async () => await chrome.storage.local.set({ yPos: 0 });
    // resetY().catch((err) => console.log(err));

    const timeoutId = setTimeout(() => {
      setRight(-50);
    }, 1000);

    getY()
      .then((y) => setY(y))
      .catch((err) => console.log(err));

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Draggable axis="y" onDrag={onDrag} onStop={onStop}>
      <SmallPurpleTagDiv
        top={y + dragY}
        right={right}
        isVisible={!tagIsOpened}
        whileHover={{
          x: '-15px',
        }}
        onClick={onClick}
      >
        <SmallText
          src={chrome.runtime.getURL(`imgs/general/small-spotlight.svg`)}
          className="smallText"
          draggable={false}
        />
        <SecondLayer>
          <Dots
            src={chrome.runtime.getURL(`imgs/general/6-dots.svg`)}
            draggable={false}
          />
        </SecondLayer>
      </SmallPurpleTagDiv>
    </Draggable>
  );
}

interface ISmallPurpleTagDiv {
  isVisible: boolean;
  right: string;
  top: number;
}

const restrictBounds = (y) => {
  y = Math.max(y, 0);
  y = Math.min(y, 600);
  return y;
};

const SmallPurpleTagDiv = styled(motion.div)<ISmallPurpleTagDiv>`
  position: absolute;
  top: ${(props) => restrictBounds(props.top)}px;
  right: ${(props) => props.right}px;
  width: 80px;
  height: 80px;
  background: linear-gradient(171.65deg, #7f33e8 -21.11%, #4b36e3 78.58%);
  border-radius: 7px 0px 0px 7px;
  cursor: pointer;
  z-index: 100;

  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transition: right 0.8s ease-in-out;
  filter: drop-shadow(0px 0px 13px rgba(51, 51, 51, 0.25));
  :hover {
    .smallText {
      filter: drop-shadow(0px 0px 7.5px rgba(238, 238, 238, 0.8));
      transition: filter 0.3s ease-in-out;
    }
  }
`;

const SmallText = styled.img`
  position: absolute;
  top: 10.5px;
  left: 5px;
  width: 16px;
  height: 60px;
`;

const SecondLayer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px 0px 0px 4px;
  display: flex;
  align-items: center;
  :hover {
    background: rgba(255, 255, 255, 0.3);
    transition: background 0.2s ease-in-out;
  }
`;

const Dots = styled.img`
  width: 8px;
  height: 16px;
  margin-left: 4px;
`;
