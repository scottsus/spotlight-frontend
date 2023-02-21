import React, { useState } from 'react';
import styled from 'styled-components';

interface IBox {
  content: string;
  isActiveInitially?: boolean;
  isClickable?: boolean;
  width?: number;
  setContents?: React.Dispatch<React.SetStateAction<any>>;
}

export default function Box({
  content,
  isActiveInitially = false,
  isClickable = false,
  width = 0,
  setContents,
}: IBox) {
  const [isActive, setIsActive] = useState(isActiveInitially);

  const toggle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isClickable) setIsActive((isActive) => !isActive);
    const targetItem = event.currentTarget.textContent;

    const checkContentList = (contentList: any[], item: any) => {
      for (const content of contentList) {
        if (content === item) return true;
      }
      return false;
    };

    setContents((contentList) => {
      const itemInContentList = checkContentList(contentList, targetItem);
      if (itemInContentList)
        return contentList.filter((content) => content !== targetItem);
      return [...contentList, targetItem];
    });
  };
  return (
    <BoxDiv isActive={isActive} width={width} onClick={toggle}>
      <BoxText>{content}</BoxText>
    </BoxDiv>
  );
}

interface IBoxDiv {
  isActive: boolean;
  width?: number;
}

const BoxDiv = styled.div<IBoxDiv>`
  width: ${(props) => (props.width > 0 ? `${props.width}px` : 'auto')};
  border: 2px solid ${(props) => (props.isActive ? '#6354ff' : '#dfe0e0')};
  border-radius: 5px;
  background-color: ${(props) => (props.isActive ? '#ebe9ff' : '#ffffff')};
  color: #6354ff;
  margin: 5px 0px;
  padding: 5px 12.5px;
  cursor: pointer;
  :hover {
    border-color: #695cff;
  }
`;

const BoxText = styled.p`
  font-size: 16px;
  font-family: Manrope;
  font-weight: 400,
  color: black;
  margin: 0;
  text-align: center;
`;
