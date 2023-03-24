import React from 'react';
import styled from 'styled-components';
import XButton from './XButton';

interface IHeader {
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  logoMargin: string;
}

export default function Header({ setTagIsOpened, logoMargin }: IHeader) {
  return (
    <HeaderDiv>
      <Logo margin={logoMargin}>spotlight</Logo>
      <XButton setTagIsOpened={setTagIsOpened} />
    </HeaderDiv>
  );
}

const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1<{ margin: string }>`
  font-size: 30px;
  font-family: Mont;
  font-weight: 800;
  color: #4b3bff;
  letter-spacing: -1.5px;
  display: inline;
  margin: ${(props) => props.margin};
`;
