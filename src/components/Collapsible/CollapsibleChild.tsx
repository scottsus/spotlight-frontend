import React, { useState, useEffect, useRef } from 'react';
import PriceTotal from './PriceTotal';
import TicketInfo from './TicketInfo';

interface ICollapsibleChild {
  isOpen: boolean;
}

const CollapsibleChild: React.FC<ICollapsibleChild> = ({ isOpen }) => {
  const [isPriceTotalPage, setIsPriceTotalPage] = useState(true);
  const [height, setHeight] = useState(0);
  const [openOverflow, setOpenOverflow] = useState('hidden');
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
  // backgroundColor: 'red',
  width: '100%',
  position: 'static',
  transition: 'height 0.2s ease-in-out',
};

export default CollapsibleChild;
