import React, { useState } from 'react';
import FilterConfig from './FilterConfig';
import SortbyConfig from './SortbyConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/fontawesome-free-solid';
import fonts from '../../lib/fonts';

interface IFilterSortby {}

const FilterSortby: React.FC<IFilterSortby> = () => {
  const [filterConfigIsOpen, setfilterConfigIsOpen] = useState(false);
  const [sortbyIsOpen, setsortbyIsOpen] = useState(false);
  const down = faChevronDown as IconProp;
  const toggleFilterConfig = () => {
    setfilterConfigIsOpen((filterConfigIsOpen) => !filterConfigIsOpen);
  };
  const toggleSortby = () => {
    setsortbyIsOpen((sortbyIsOpen) => !sortbyIsOpen);
  };
  return (
    <div style={filterSortbyStyles}>
      <style>{fonts}</style>
      <div style={parentStyles}>
        <div style={filterButtonStyles} onClick={toggleFilterConfig}>
          <img
            src={chrome.runtime.getURL('imgs/filter.png')}
            style={imgStyles}
          />
          <h3 style={h3Styles}>Filters</h3>
        </div>
        <FilterConfig
          filterConfigIsOpen={filterConfigIsOpen}
          toggle={toggleFilterConfig}
        />
      </div>
      <div style={parentStyles}>
        <div style={sortbyButtonStyles} onClick={toggleSortby}>
          <h3 style={h3Styles}>Sort By:</h3>
          <FontAwesomeIcon icon={down} />
        </div>
        <SortbyConfig sortbyIsOpen={sortbyIsOpen} />
      </div>
    </div>
  );
};

const filterSortbyStyles: React.CSSProperties = {
  color: '#4B3BFF',
  height: '30px',
  maxHeight: '30px',
  width: '35%',
  margin: '10px 0px',
  display: 'flex',
  justifyContent: 'space-between',
};

const parentStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '85px',
  maxWidth: '85px',
};

const filterButtonStyles: React.CSSProperties = {
  border: '1.5px solid #4B3BFF',
  borderRadius: '4.65px',
  height: '28px',
  width: '84px',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  cursor: 'pointer',
};

const sortbyButtonStyles: React.CSSProperties = {
  border: '1.5px solid #4B3BFF',
  borderRadius: '4.65px',
  height: '28px',
  width: '93px',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  cursor: 'pointer',
};

const h3Styles: React.CSSProperties = {
  margin: '0px',
  fontFamily: 'Manrope',
  fontSize: '16px',
  fontWeight: 400,
};

const imgStyles: React.CSSProperties = {
  height: '17px',
  width: '17px',
};

export default FilterSortby;
