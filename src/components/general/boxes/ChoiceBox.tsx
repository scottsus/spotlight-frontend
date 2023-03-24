import React from 'react';
import { BoxDiv, BoxText } from './boxSkeleton';

interface IChoiceBox {
  content: string;
  index: number;
  activeIndexes: number[];
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  setContents?: React.Dispatch<React.SetStateAction<any>>;
}

export default function Box({
  content,
  index,
  activeIndexes,
  handleClick,
  setContents,
}: IChoiceBox) {
  const isActive = (index: number) => {
    const copyActiveIndexes = activeIndexes;
    for (const activeIndex of copyActiveIndexes)
      if (activeIndex === index) return true;
    return false;
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    handleClick(event);

    const targetItem = event.currentTarget.textContent;

    if (targetItem === `Any`) {
      setContents([`Any`]);
      return;
    } else {
      setContents((contents) =>
        contents.filter((content) => content !== `Any`)
      );
    }

    const checkContentList = (contentList: any[], item: any) => {
      for (const content of contentList) {
        if (content === item) return true;
      }
      return false;
    };

    // Either select it or unselect it
    setContents((contentList) => {
      const itemInContentList = checkContentList(contentList, targetItem);
      if (itemInContentList)
        return contentList.filter((content) => content !== targetItem);
      return [...contentList, targetItem];
    });
  };

  return (
    <BoxDiv
      isClickable
      isActive={isActive(index)}
      margin="2px"
      padding="5px 10.4687px"
      onClick={onClick}
    >
      <BoxText>{content}</BoxText>
    </BoxDiv>
  );
}
