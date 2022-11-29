import React from 'react';
import { motion } from 'framer-motion';

const TicketInfo = () => {
  return (
    <motion.div
      style={ticketInfoStyles}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key='ticketinfo'
    >
      <div style={textStyles}>
        <h1 style={categoryHeaderStyles}>Tickets Available:</h1>
        <h2 style={bodyStyles}>1 - 3 Resale Tickets</h2>
        <h1 style={{ ...categoryHeaderStyles, marginTop: '12px' }}>
          Electronic Tickets:
        </h1>
        <h2 style={bodyStyles}>E-tickets delivered to your email address</h2>
        <h1 style={{ ...categoryHeaderStyles, marginTop: '12px' }}>
          Notes from Seller:
        </h1>
        <h2 style={bodyStyles}>XFER</h2>
        <h1 style={{ ...categoryHeaderStyles, marginTop: '12px' }}>
          Buyer Guarantee:
        </h1>
        <h2 style={bodyStyles}>🚀🚀</h2>
      </div>
      <div style={pictureStyles}>
        <img
          src={chrome.runtime.getURL('imgs/pov.png')}
          alt='PoV'
          style={{ ...imgStyles, ...{ height: '120px' } }}
        />
        <img
          src={chrome.runtime.getURL('imgs/stadium.png')}
          alt='stadium'
          style={{ ...imgStyles, ...{ height: '105px' } }}
        />
      </div>
    </motion.div>
  );
};

const ticketInfoStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-evenly',
  padding: '16px 35px',
  overflowY: 'scroll',
};

const textStyles: React.CSSProperties = {
  width: '263px',
};

const pictureStyles: React.CSSProperties = {
  height: '120px',
  width: '180px',
};

const categoryHeaderStyles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 700,
  color: '#27292A',
  margin: '2px 0px',
};

const bodyStyles: React.CSSProperties = {
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 300,
  color: '#5F5F5F',
  margin: '2px 0px',
};

const imgStyles: React.CSSProperties = {
  width: '170px',
};

export default TicketInfo;
