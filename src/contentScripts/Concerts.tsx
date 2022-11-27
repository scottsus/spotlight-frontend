import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div style={appStyles}>
      <h1>Concerts Coming Soon!</h1>
    </div>
  );
};

const appStyles: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  color: 'black',
  position: 'absolute',
  left: '53%',
  top: '1%',
  width: '100px',
  height: '50px',
  borderRadius: '10px',
  zIndex: 1000,
  filter: 'drop-shadow(0 0 0.75rem rgb(101, 100, 100))',
};

const div = document.createElement('div');
document.body.appendChild(div);

const root = createRoot(div);
root.render(<App />);
