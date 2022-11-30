import React, { useState } from 'react';

const SortbyItem = ({ text }) => {
  const [isHovering, setIsHovering] = useState(false);
  const toggle = () => {
    setIsHovering((isHovering) => !isHovering);
  };
  return (
    <div
      style={
        isHovering
          ? { ...sortbyItemStyles, backgroundColor: '#F1F1F1' }
          : sortbyItemStyles
      }
      onMouseEnter={toggle}
      onMouseLeave={toggle}
    >
      {text}
    </div>
  );
};

const sortbyItemStyles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 400,
  borderRadius: '5px',
  padding: '2px 2px',
  margin: '4px 0px',
};

export default SortbyItem;
