import React, { useState } from 'react';
import PriceTotal from './PriceTotal';
import TicketInfo from './TicketInfo';

const CollapsibleChild = () => {
  const [isPriceTotalPage, setIsPriceTotalPage] = useState(true);
  return (
    <div style={collapsibleChildStyles}>
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
  backgroundColor: 'red',
};

export default CollapsibleChild;
