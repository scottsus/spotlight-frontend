import React, { useState } from 'react';
import Box from './Box';

interface IBoxes {
  contentList: string[];
}

const Boxes: React.FC<IBoxes> = ({ contentList }) => {
  const width = Math.floor(98.0 / contentList.length) + '%';
  const boxes = contentList.map((content) => (
    <Box content={content} isClickable={true} widthPercentage={width} />
  ));

  return <div style={boxesStyles}>{boxes}</div>;
};

const boxesStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-evenly',
};

export default Boxes;
