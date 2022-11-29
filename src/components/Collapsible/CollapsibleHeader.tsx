import React from 'react';
import Overview from './Overview';
import CheckoutButton from './CheckoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronUp,
  faChevronDown,
} from '@fortawesome/fontawesome-free-solid';

const CollapsibleHeader = ({
  isOpen,
  toggle,
  logo,
  section,
  row,
  price,
  url,
}) => {
  const down = faChevronDown as IconProp;
  const up = faChevronUp as IconProp;
  return (
    <div style={collapsibleHeaderStyles}>
      <button style={buttonStyle} onClick={toggle}>
        {!isOpen ? (
          <FontAwesomeIcon icon={down} />
        ) : (
          <FontAwesomeIcon icon={up} />
        )}
      </button>
      <img style={imgStyle} src={logo} alt='logo' />
      <Overview section={section} row={row} price={price} />
      <CheckoutButton price={price} url={url} />
    </div>
  );
};

const collapsibleHeaderStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const buttonStyle: React.CSSProperties = {
  height: '16px',
  width: '14px',
  border: 'none',
  padding: '0px 0px',
  backgroundColor: '#FFFFFF',
  color: '#4B3BFF',
  cursor: 'pointer',
};

const imgStyle: React.CSSProperties = {
  height: '70px',
  width: '85px',
  display: 'inline',
};

export default CollapsibleHeader;
