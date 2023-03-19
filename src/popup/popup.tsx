import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';

import MainPage from '../components/popup/MainPage';
import fonts from '../lib/constants/fonts';

import './globals.css';

export default function Popup() {
  return (
    <PopupDiv>
      <style>{fonts}</style>
      <MainPage />
    </PopupDiv>
  );
}

const PopupDiv = styled.div`
  * {
    line-height: 1.4;
  }
`;

const div = document.createElement('div');
document.body.appendChild(div);

const shadowRoot = createRoot(div);
shadowRoot.render(<Popup />);
