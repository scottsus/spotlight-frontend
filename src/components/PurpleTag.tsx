import React, { useState } from 'react';

interface IPurpleTag {
  tagIsOpened: boolean;
}

const PurpleTag = ({ tagIsOpened, setTagIsOpened }) => {
  const [isHovering, setIsHovering] = useState(false);
  const toggle = () => {
    setIsHovering((isHovering) => !isHovering);
  };
  return (
    <div
      style={
        !isHovering
          ? { ...purpleTagStyles, right: '-100px' }
          : { ...purpleTagStyles, right: '-30px' }
      }
    >
      <input
        type='image'
        src={chrome.runtime.getURL('purpletag.png')}
        onClick={setTagIsOpened}
        onMouseEnter={toggle}
        onMouseLeave={toggle}
      />
    </div>
  );
};

const purpleTagStyles: React.CSSProperties = {
  top: '25%',
  position: 'absolute',
  zIndex: 1000,
};

export default PurpleTag;
