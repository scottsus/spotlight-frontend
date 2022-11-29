import React from 'react';
import { motion } from 'framer-motion';

interface IPurpleTag {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const PurpleTag: React.FC<IPurpleTag> = ({ tagIsOpened, setTagIsOpened }) => {
  return (
    <motion.div
      style={
        tagIsOpened
          ? { ...purpleTagStyles, visibility: 'hidden' }
          : { ...purpleTagStyles, visibility: 'visible' }
      }
      whileHover={{
        x: '-25px',
      }}
    >
      <style>{HtmlBodyStyles}</style>
      <input
        type='image'
        src={chrome.runtime.getURL('imgs/purpletag.png')}
        style={imgStyles}
        onClick={() => setTagIsOpened((tagIsOpened) => !tagIsOpened)}
      />
    </motion.div>
  );
};

const purpleTagStyles: React.CSSProperties = {
  top: '25%',
  right: '-60px',
  position: 'absolute',
  transition: 'right 0.1s ease',
  zIndex: 1000,
};

const HtmlBodyStyles: string = `
html, body {
  overflow-x: hidden;
}
`;

const imgStyles: React.CSSProperties = {
  height: '100px',
  width: '160px',
};

export default PurpleTag;
