import React, { useState } from 'react';
import Overview from './Overview';
import CheckoutButton from './CheckoutButton';
import ExpandablePage from './ExpandablePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronUp,
  faChevronDown,
} from '@fortawesome/fontawesome-free-solid';

export interface ICollapsible {
  logo: string;
  seats: string;
  price: number;
  url: string;
}

const Collapsible: React.FC<ICollapsible> = ({ logo, seats, price, url }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const down = faChevronDown as IconProp;
  const up = faChevronUp as IconProp;
  return (
    <div style={collapsibleStyle}>
      <button style={buttonStyle} onClick={toggle}>
        {!isOpen ? (
          <FontAwesomeIcon icon={down} />
        ) : (
          <FontAwesomeIcon icon={up} />
        )}
      </button>
      <img style={imgStyle} src={logo} alt='logo' />
      <Overview seats={seats} price={price} />
      <CheckoutButton url={url} />
      {isOpen && <ExpandablePage />}
    </div>
  );
};

const collapsibleStyle: React.CSSProperties = {
  border: '2px solid grey',
  borderRadius: '5px',
  height: '100px',
  width: '100%',
  display: 'flex',
  margin: '10px 0px',
};

const buttonStyle: React.CSSProperties = {
  height: '10px',
  border: '2px solid #4B3BFF',
  backgroundColor: '#FFFFFF',
  color: '#4B3BFF',
};

const imgStyle: React.CSSProperties = {
  height: '50px',
  width: '65px',
  display: 'inline',
};

export default Collapsible;
