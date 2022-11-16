import React from 'react';

interface IPurpleTag {
  tagIsOpened: boolean;
}

const PurpleTag = ({ tagIsOpened, setTagIsOpened }) => {
  return (
    <div style={purpleTagStyles}>
      <input
        type='image'
        src={chrome.runtime.getURL('purpletag.png')}
        onClick={setTagIsOpened}
      />
    </div>
  );
};

const purpleTagStyles: React.CSSProperties = {
  top: '25%',
  right: '0%',
  position: 'absolute',
  zIndex: 1000,
};

export default PurpleTag;
