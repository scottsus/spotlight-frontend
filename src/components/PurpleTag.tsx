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
        x: '-40px',
      }}
    >
      <style>{HtmlBodyStyles}</style>
      <input
        type='image'
        src={chrome.runtime.getURL('purpletag.png')}
        onClick={() => setTagIsOpened((tagIsOpened) => !tagIsOpened)}
      />
    </motion.div>
  );
};

const purpleTagStyles: React.CSSProperties = {
  top: '25%',
  right: '-100px',
  position: 'absolute',
  transition: 'right 0.1s ease',
  zIndex: 1000,
};

const HtmlBodyStyles: string = `
html, body {
  overflow-x: hidden;
}
`;

export default PurpleTag;
