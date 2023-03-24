import React from 'react';
import { BoxDiv, BoxText } from './boxSkeleton';

interface IRadioBox {
  content: string;
  index: number;
  activeIndex: number;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  setSelectedNumber: React.Dispatch<React.SetStateAction<any>>;
}

export default function RadioBox({
  content,
  index,
  activeIndex,
  handleClick,
  setSelectedNumber,
}: IRadioBox) {
  const toggle = (event: React.MouseEvent<HTMLDivElement>) => {
    handleClick(event);

    if (index === 0) setSelectedNumber(`Any`);
    else if (index >= 9) setSelectedNumber(`9+`);
    else setSelectedNumber(index);
  };

  return (
    <BoxDiv
      isClickable
      isActive={index === activeIndex}
      width={39}
      margin="5px 0"
      padding="5px 10.3px"
      onClick={toggle}
    >
      <BoxText>{content}</BoxText>
    </BoxDiv>
  );
}
