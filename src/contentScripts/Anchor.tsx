import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';

import MainPage from '../components/anchor/MainPage';
import SmallPurpleTag from '../components/SmallPurpleTag';
import fonts from '../lib/constants/fonts';

import './globals.css';

export default function Anchor() {
  const [tagIsOpened, setTagIsOpened] = useState(false);
  return (
    <AnchorDiv>
      <style>{fonts}</style>
      <SmallPurpleTag
        tagIsOpened={tagIsOpened}
        setTagIsOpened={setTagIsOpened}
      />
      <MainPage tagIsOpened={tagIsOpened} setTagIsOpened={setTagIsOpened} />
    </AnchorDiv>
  );
}

const AnchorDiv = styled.div`
  * {
    line-height: 1.4;
  }
`;

const div = document.createElement('div');
document.body.appendChild(div);

const shadowRoot = createRoot(div);
shadowRoot.render(<Anchor />);
