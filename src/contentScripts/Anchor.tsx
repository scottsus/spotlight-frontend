import React from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';

import './globals.css';

const App: React.FC = () => {
  return (
    <>
      <h1>Hello Spotlight!</h1>
    </>
  );
};

const div = document.createElement('div');
document.body.appendChild(div);

const shadowRoot = createRoot(div);
shadowRoot.render(<App />);
