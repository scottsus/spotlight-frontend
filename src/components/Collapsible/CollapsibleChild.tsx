import React, { useState, useEffect } from 'react';
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
      setHeight(300);
      setOpenOverflow('visible');
    } else {
      setHeight(0);
      setOpenOverflow('hidden');
    }
  }, [isOpen]);
  return (
    <div
      style={{
        ...collapsibleChildStyles,
        ...{ height: height },
        ...{ overflow: openOverflow },
      }}
    >
      <hr style={hrStyles} />
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
    </div>
  );
};

const collapsibleChildStyles: React.CSSProperties = {
  width: '100%',
  position: 'static',
  transition: 'height 0.2s ease-in-out',
};

const hrStyles: React.CSSProperties = {
  borderTop: '1px solid #DFE0E0',
};

const headersStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-evenly',
  margin: '5px 0px',
  fontSize: '18px',
  fontWeight: 500,
};

const activeHeaderStyles: React.CSSProperties = {
  color: '#4B3BFF',
  fontSize: '15px',
};

const inactiveHeaderStyles: React.CSSProperties = {
  color: '#96979C',
  fontSize: '15px',
};

const headerButtonStyles: React.CSSProperties = {
  border: 'none',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
};

export default CollapsibleChild;
