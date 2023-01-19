import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IPurpleTag {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PurpleTag({ tagIsOpened, setTagIsOpened }: IPurpleTag) {
  return (
    <PurpleTagDiv
      isVisible={!tagIsOpened}
      whileHover={{
        x: '-25px',
      }}
    >
      <Image
        src={chrome.runtime.getURL('imgs/purpletag.png')}
        onClick={() => setTagIsOpened((tagIsOpened) => !tagIsOpened)}
      />
    </PurpleTagDiv>
  );
}

const PurpleTagDiv = styled(motion.div)<{ isVisible: boolean }>`
  position: absolute;
  top: 25%;
  right: -60px;
  transition: right 0.1s ease;
  z-index: 100;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

const Image = styled.img`
  width: 160px;
  height: 100px;
`;
