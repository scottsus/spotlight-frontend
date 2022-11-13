import React from 'react';

const Filters = () => {
  return (
    <div style={filtersStyles}>
      <div style={sortByStyles}>
        <h3 style={h3Styles}>Filters</h3>
      </div>
      <div style={sortByStyles}>
        <h3 style={h3Styles}>Sort By</h3>
      </div>
    </div>
  );
};

const filtersStyles = {
  color: '#4B3BFF',
  height: '25px',
  width: '100%',
  display: 'flex',
};

const sortByStyles = {
  border: '2px solid #4B3BFF',
  borderRadius: '5px',
  height: '90%',
  width: '60px',
  display: 'inline',
  margin: '0px 10px',
};

const h3Styles = {
  fontSize: '15px',
};

export default Filters;
