import React from 'react';

const TicketInfo = () => {
  return (
    <div style={ticketInfoStyles}>
      <div style={textStyles}>
        <h1 style={headerStyles}>Tickets Available:</h1>
        <h2 style={bodyStyles}>1 - 3 Resale Tickets</h2>
        <h1 style={headerStyles}>Electronic Tickets:</h1>
        <h2 style={bodyStyles}>E-tickets delivered to your email address</h2>
        <h1 style={headerStyles}>Notes from Seller:</h1>
        <h2 style={bodyStyles}>XFER</h2>
        <h1 style={headerStyles}>Buyer Guarantee:</h1>
        <h2 style={bodyStyles}>🚀🚀</h2>
      </div>
      <div style={pictureStyles}>
        <img
          src={chrome.runtime.getURL('pov.png')}
          alt='PoV'
          style={{ ...imgStyles, ...{ height: '120px' } }}
        />
        <img
          src={chrome.runtime.getURL('stadium.png')}
          alt='stadium'
          style={{ ...imgStyles, ...{ height: '105px' } }}
        />
      </div>
    </div>
  );
};

const ticketInfoStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-evenly',
  padding: '0px 10px',
};

const textStyles: React.CSSProperties = {
  width: '50%',
};

const pictureStyles: React.CSSProperties = {
  width: '40%',
};

const headerStyles: React.CSSProperties = {
  color: '#000000',
  margin: '8px 0px 0px 0px',
  fontSize: '17px',
  fontWeight: 600,
};

const bodyStyles: React.CSSProperties = {
  width: '100%',
  fontSize: '14px',
  fontWeight: 400,
  margin: '1px 0px',
};

const imgStyles: React.CSSProperties = {
  width: '170px',
};

export default TicketInfo;
