import React from 'react';
import { BoxDiv, BoxText } from './boxSkeleton';

interface IBox {
  content: string;
  width: number;
  isClickable?: boolean;
}

export default function Box({ content, width, isClickable = false }: IBox) {
  return (
    <BoxDiv width={width} isClickable={isClickable}>
      <BoxText>{content}</BoxText>
    </BoxDiv>
  );
}
