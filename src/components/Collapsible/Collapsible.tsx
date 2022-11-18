import React, { useState } from 'react';
import CollapsibleHeader from './CollapsibleHeader';
import CollapsibleChild from './CollapsibleChild';

export interface ICollapsible {
  logo: string;
  section: string;
  row: string;
  price: number;
  url: string;
}

const Collapsible: React.FC<ICollapsible> = ({
  logo,
  section,
  row,
  price,
  url,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <div style={collapsibleStyle}>
      <CollapsibleHeader
        isOpen={isOpen}
        toggle={toggle}
        logo={logo}
        section={section}
        row={row}
        price={price}
        url={url}
      />
      {isOpen && <CollapsibleChild />}
    </div>
  );
};

const collapsibleStyle: React.CSSProperties = {
  border: '2px solid #DFE0E0',
  borderRadius: '5px',
  height: '100px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '10px 0px',
};

export default Collapsible;
