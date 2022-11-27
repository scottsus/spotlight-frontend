import React from 'react';
import Collapsible, { ICollapsible } from './collapsible/Collapsible';

interface IMainList {
  tickets: ICollapsible[];
}

const MainList: React.FC<IMainList> = ({ tickets }) => {
  const collapsibleItems = tickets.map((collapsible) => (
    <Collapsible
      logo={chrome.runtime.getURL(`${collapsible.logo}.png`)}
      section={collapsible.section}
      row={collapsible.row}
      price={collapsible.price}
      url={collapsible.url}
    />
  ));
  return <div style={mainListStyles}>{collapsibleItems}</div>;
};

const mainListStyles: React.CSSProperties = {
  marginTop: '-20px',
  height: '75%',
  overflowY: 'scroll',
};

export default MainList;
