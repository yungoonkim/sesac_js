import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* 배포시 빠질거긴 하지만 굳이 뺄필요 없음 */}
    <App />
  </React.StrictMode>
);

