import React from 'react';
import styled from 'styled-components';

export default function MainPage() {
  return <MainPageDiv></MainPageDiv>;
}

const MainPageDiv = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 536px;
  height: 689px;
  border-radius: 10.5px;
  background-color: #ffffff;
  z-index: 100;
  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.26));
  overflow: hidden;
`;
