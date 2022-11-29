import React, { useState, useEffect } from 'react';
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
  const [childIsOpen, setChildIsOpen] = useState(false);
  const [height, setHeight] = useState(100);
  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      setChildIsOpen(true);
      setHeight(351);
    } else {
      setChildIsOpen(false);
      setHeight(85);
    }
  }, [isOpen]);

  return (
    <div
      id='collapsible'
      style={{ ...collapsibleStyles, ...{ height: height } }}
    >
      <CollapsibleHeader
        isOpen={isOpen}
        toggle={toggle}
        logo={logo}
        section={section}
        row={row}
        price={price}
        url={url}
      />
      <CollapsibleChild isOpen={childIsOpen} />
    </div>
  );
};

const collapsibleStyles: React.CSSProperties = {
  border: '2px solid #DFE0E0',
  borderRadius: '10px',
  height: '50px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '7px auto',
  transition: 'height 0.2s ease-in-out',
  overflow: 'hidden',
};

export default Collapsible;
