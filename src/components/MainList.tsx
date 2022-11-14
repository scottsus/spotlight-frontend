import React from 'react';
import Collapsible, { ICollapsible } from './Collapsible';

interface IMainList {
  data: ICollapsible[];
}

const MainList: React.FC<IMainList> = ({ data }) => {
  const blockItems = data.map((block) => (
    <Collapsible
      logo={chrome.runtime.getURL(`${block.logo}.png`)}
      seats={block.seats}
      price={block.price}
      url={block.url}
    />
  ));
  return <div>{blockItems}</div>;
};

export default MainList;
