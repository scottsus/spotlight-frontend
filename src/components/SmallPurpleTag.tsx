import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ISmallPurpleTag {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SmallPurpleTag({
  tagIsOpened,
  setTagIsOpened,
}: ISmallPurpleTag) {
  const [right, setRight] = useState(`-200px`);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRight(`-69px`);
    }, 1000);
    return () => clearTimeout(timeoutId);
  });
  return (
    <SmallPurpleTagDiv
      right={right}
      isVisible={!tagIsOpened}
      whileHover={{
        x: '-4px',
      }}
      onClick={() => setTagIsOpened((tagIsOpened) => !tagIsOpened)}
    >
      <BaseLayer src={chrome.runtime.getURL('imgs/small-base-layer.png')} />
      <Dots
        src={chrome.runtime.getURL('imgs/small-text.svg')}
        className="smallText"
      />
    </SmallPurpleTagDiv>
  );
}

const SmallPurpleTagDiv = styled(motion.div)<{
  isVisible: boolean;
  right: string;
}>`
  position: absolute;
  top: 32%;
  right: ${(props) => props.right};
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
