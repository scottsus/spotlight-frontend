import React, { useState } from 'react';
import styled from 'styled-components';

interface IBox {
  content: string;
  isClickable?: boolean;
  width?: number;
}

export default function Box({ content, isClickable = false, width = 0 }: IBox) {
  const [isActive, setIsActive] = useState(false);
  const toggle = () => {
    if (isClickable) setIsActive((isActive) => !isActive);
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
  border: 2px solid ${(props) => (props.isActive ? '#4b3bff' : '#dfe0e0')};
  border-radius: 5px;
  background-color: ${(props) => (props.isActive ? '#ebe9ff' : '#ffffff')};
  color: #4b3bff;
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
