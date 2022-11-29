import React from 'react';

interface IXButton {
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const XButton: React.FC<IXButton> = ({ setTagIsOpened }) => {
  return (
    <div style={xButtonStyles}>
      <button onClick={() => setTagIsOpened(false)} style={buttonStyles}>
        <img src={chrome.runtime.getURL('imgs/X Button.png')} />
      </button>
    </div>
  );
};

const xButtonStyles: React.CSSProperties = {
  position: 'absolute',
  top: '5%',
  right: '5%',
};

const buttonStyles: React.CSSProperties = {
  border: 'none',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
};

export default XButton;
