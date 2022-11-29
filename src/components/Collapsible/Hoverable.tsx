import React, { useState } from 'react';

interface IHoverable {
  url: string;
  children: React.ReactNode;
}

const Hoverable: React.FC<IHoverable> = ({ url, children }) => {
  const [isHovering, setIsHovering] = useState(true);
  const toggle = () => {
    setIsHovering((isHovering) => !isHovering);
  };
  return (
    <div style={isHovering ? isHoveringStyles : isNotHoveringStyles}>
      <a href={url} target='_blank' onMouseEnter={toggle} onMouseLeave={toggle}>
        {children}
      </a>
    </div>
  );
};

const isHoveringStyles: React.CSSProperties = {
  backgroundColor: '#4B3BFF',
  borderRadius: '8px',
  height: '47px',
  width: '159px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const isNotHoveringStyles: React.CSSProperties = {
  backgroundColor: '#695CFF',
  borderRadius: '8px',
  height: '47px',
  width: '159px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default Hoverable;
