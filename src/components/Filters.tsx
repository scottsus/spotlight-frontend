import React from 'react';

const Filters = () => {
  return (
    <div style={filtersStyles}>
      <div style={sortByStyles}>
        <img src={chrome.runtime.getURL('filter.png')} style={imgStyles} />
        <h3 style={h3Styles}>Filters</h3>
      </div>
      <div style={sortByStyles}>
        <h3 style={h3Styles}>Sort By:</h3>
      </div>
    </div>
  );
};

const filtersStyles: React.CSSProperties = {
  color: '#4B3BFF',
  height: '30px',
  width: '100%',
  margin: '20px 0px',
  display: 'flex',
};

const sortByStyles: React.CSSProperties = {
  border: '2px solid #4B3BFF',
  borderRadius: '5px',
  height: '90%',
  width: '75px',
  display: 'flex',
  margin: '0px 5px',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

const h3Styles: React.CSSProperties = {
  margin: '0px',
  fontSize: '15px',
  fontWeight: 200,
};

const imgStyles: React.CSSProperties = {
  height: '17px',
  width: '17px',
};

export default Filters;
