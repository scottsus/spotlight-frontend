import React, { useState } from 'react';

interface IBox {
  content: string;
  isClickable: boolean;
  widthPercentage: string;
}

const Box: React.FC<IBox> = ({ content, isClickable, widthPercentage }) => {
  const [boxIsActive, setBoxIsActive] = useState(false);
  const toggle = () => {
    if (isClickable) setBoxIsActive((boxIsActive) => !boxIsActive);
  };
  return (
    <div
      style={{ ...chooseStyle(boxIsActive), width: widthPercentage }}
      onClick={toggle}
    >
      <h1 style={h1Styles}>{content}</h1>
    </div>
  );
};

const chooseStyle = (boxIsActive) => {
  if (boxIsActive) return activeBoxStyles;
  return inactiveBoxStyles;
};

const activeBoxStyles: React.CSSProperties = {
  border: '2px solid #4B3BFF',
  borderRadius: '5px',
  backgroundColor: '#EBE9FF',
  color: '#4B3BFF',
  margin: '5px 0px',
  padding: '5px 2px',
  height: '32px',
};

const inactiveBoxStyles: React.CSSProperties = {
  border: '2px solid #DFE0E0',
  borderRadius: '5px',
  margin: '5px 0px',
  padding: '5px 2px',
  height: '32px',
};

const h1Styles: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 300,
  color: 'black',
  margin: '0px 0px',
  textAlign: 'center',
};

export default Box;
