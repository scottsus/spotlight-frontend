import React from 'react';
import styled from 'styled-components';

interface IXButton {
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function XButton({ setTagIsOpened }: IXButton) {
  const closeTag = () => setTagIsOpened(false);
  return (
    <XButtonContainer onClick={closeTag}>
      <Image src={chrome.runtime.getURL('imgs/X Button.svg')} />
    </XButtonContainer>
  );
}

const XButtonContainer = styled.button`
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 15px;
  :hover {
    background-color: #f1f1f1;
  }
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
`;
