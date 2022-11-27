import React, { useState } from 'react';
import FilterConfig from './FilterConfig';
import SortbyConfig from './SortbyConfig';

interface IFilterSortby {}

const FilterSortby: React.FC<IFilterSortby> = () => {
  const [filterConfigIsOpen, setfilterConfigIsOpen] = useState(false);
  const [sortbyIsOpen, setsortbyIsOpen] = useState(false);
  const toggleFilterConfig = () => {
    setfilterConfigIsOpen((filterConfigIsOpen) => !filterConfigIsOpen);
  };
  const toggleSortby = () => {
    setsortbyIsOpen((sortbyIsOpen) => !sortbyIsOpen);
  };
  return (
    <div style={filterSortbyStyles}>
      <div style={parentStyles}>
        <div style={buttonStyles} onClick={toggleFilterConfig}>
          <img src={chrome.runtime.getURL('filter.png')} style={imgStyles} />
          <h3 style={h3Styles}>Filters</h3>
        </div>
        <FilterConfig
          filterConfigIsOpen={filterConfigIsOpen}
          toggle={toggleFilterConfig}
        />
      </div>
      <div style={parentStyles}>
        <div style={buttonStyles} onClick={toggleSortby}>
          <h3 style={h3Styles}>Sort By:</h3>
        </div>
      </div>
      {sortbyIsOpen && <SortbyConfig />}
    </div>
  );
};

const filterSortbyStyles: React.CSSProperties = {
  color: '#4B3BFF',
  height: '30px',
  width: '100%',
  margin: '20px 0px',
  display: 'flex',
};

const parentStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '85px',
  maxWidth: '85px',
};

const buttonStyles: React.CSSProperties = {
  border: '2px solid #4B3BFF',
  borderRadius: '5px',
  height: '90%',
  display: 'flex',
  margin: '0px 5px 10px 5px',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  cursor: 'pointer',
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

export default FilterSortby;
