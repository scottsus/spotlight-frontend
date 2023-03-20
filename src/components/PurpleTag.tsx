import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IPurpleTag {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PurpleTag({ tagIsOpened, setTagIsOpened }: IPurpleTag) {
  const [right, setRight] = useState(`-200px`);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRight(`-95px`);
    }, 1000);
    return () => clearTimeout(timeoutId);
  });
  return (
    <PurpleTagDiv
      right={right}
      isVisible={!tagIsOpened}
      whileHover={{
        x: '-6.5px',
      }}
    >
      <BaseLayer
        src={chrome.runtime.getURL('imgs/base-layer.png')}
        onClick={() => setTagIsOpened((tagIsOpened) => !tagIsOpened)}
      />
      <Dots
        src={chrome.runtime.getURL('imgs/white-dots.png')}
        className="dots"
      />
    </PurpleTagDiv>
  );
}

const PurpleTagDiv = styled(motion.div)<{
  isVisible: boolean;
  right: string;
}>`
  position: absolute;
  top: 25%;
  right: ${(props) => props.right};
  cursor: pointer;
  z-index: 100;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transition: right 0.8s ease-in-out;
  :hover {
    .dots {
      filter: drop-shadow(0px 0px 20px rgba(238, 238, 238, 1.5));
      transition: filter 0.3s ease-in-out;
    }
  }
`;

const BaseLayer = styled.img`
  width: 160px;
  height: 84px;
`;

const Dots = styled.img`
  position: relative;
  top: -24px;
  left: -115px;
  width: 36px;
  height: 36px;
`;
