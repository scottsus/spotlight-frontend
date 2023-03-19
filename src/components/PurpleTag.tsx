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
      setRight(`-55px`);
    }, 1000);
    return () => clearTimeout(timeoutId);
  });
  return (
    <PurpleTagDiv
      right={right}
      isVisible={!tagIsOpened}
      whileHover={{
        x: '-8.5px',
      }}
    >
      <Image
        src={chrome.runtime.getURL('imgs/purpletag.svg')}
        onClick={() => setTagIsOpened((tagIsOpened) => !tagIsOpened)}
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
`;

const Image = styled.img`
  width: 160px;
  height: 84px;
`;
