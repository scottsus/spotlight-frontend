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
      setRight(-69);
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
          x: '-6px',
        }}
        onClick={onClick}
      >
        <BaseLayer
          src={chrome.runtime.getURL('imgs/small-base-layer.png')}
          draggable={false}
        />
        <Dots
          src={chrome.runtime.getURL('imgs/small-text.svg')}
          className="smallText"
          draggable={false}
        />
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

const BaseLayer = styled.img`
  width: 80px;
  height: 80px;
`;

const Dots = styled.img`
  position: relative;
  top: -10px;
  left: -73.5px;
  width: 16px;
  height: 60px;
`;
