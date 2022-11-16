import React from 'react';

interface IXButton {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const XButton = ({ tagIsOpened, setTagIsOpened }) => {
  return (
    <div style={xButtonStyles}>
      <button onClick={() => setTagIsOpened(false)}>X</button>
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
};

export default XButton;
