import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import PriceTotal from './PriceTotal';
import TicketInfo from './TicketInfo';

interface ICollapsibleChild {
  isOpen: boolean;
}

const CollapsibleChild: React.FC<ICollapsibleChild> = ({ isOpen }) => {
  const [height, setHeight] = useState(0);
  const [openOverflow, setOpenOverflow] = useState('hidden');
  const [isPriceTotalPage, setIsPriceTotalPage] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setHeight(266);
      setOpenOverflow('visible');
    } else {
      setHeight(0);
      setOpenOverflow('hidden');
    }
  }, [isOpen]);
  return (
    <div
      id='abcd'
      style={{
        ...collapsibleChildStyles,
        ...{ height: height },
        ...{ overflow: openOverflow },
      }}
    >
      <div style={dividerStyles} />
      <div
        style={
          isPriceTotalPage
            ? { ...purplebarStyles, marginLeft: '2px', marginRight: 'auto' }
            : { ...purplebarStyles, marginLeft: 'auto', marginRight: '2px' }
        }
      />
      <div style={headersStyles}>
        <button
          onClick={() => setIsPriceTotalPage(true)}
          style={headerButtonStyles}
        >
          <h1
            style={isPriceTotalPage ? activeHeaderStyles : inactiveHeaderStyles}
          >
            Price Total
          </h1>
        </button>
        <button
          onClick={() => setIsPriceTotalPage(false)}
          style={headerButtonStyles}
        >
          <h1
            style={isPriceTotalPage ? inactiveHeaderStyles : activeHeaderStyles}
          >
            Ticket Info
          </h1>
        </button>
      </div>
      <AnimatePresence>
        {isPriceTotalPage ? (
          <PriceTotal
            ticketPrice={125}
            ticketQty={1}
            orderProcessingFee={15.0}
            serviceFee={20.5}
            calculatedTax={2.25}
          />
        ) : (
          <TicketInfo />
        )}
      </AnimatePresence>
    </div>
  );
};

const collapsibleChildStyles: React.CSSProperties = {
  width: '100%',
  position: 'static',
  transition: 'height 0.2s ease-in-out',
};

const dividerStyles: React.CSSProperties = {
  height: '2px',
  width: '100%',
  backgroundColor: '#DFE0E0',
};

const purplebarStyles: React.CSSProperties = {
  height: '4px',
  width: '253px',
  borderRadius: '2px',
  backgroundColor: '#4B3BFF',
};

const headersStyles: React.CSSProperties = {
  height: '28px',
  display: 'flex',
  justifyContent: 'space-evenly',
  margin: '5px 0px',
  fontSize: '18px',
  fontWeight: 500,
};

const activeHeaderStyles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 600,
  color: '#4B3BFF',
};

const inactiveHeaderStyles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 300,
  color: '#96979C',
};

const headerButtonStyles: React.CSSProperties = {
  width: '50%',
  border: 'none',
  padding: '0px 0px',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
};

export default CollapsibleChild;
