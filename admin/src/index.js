import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

// React 루트를 생성하고 App 컴포넌트를 렌더링함
root.render(
  <React.StrictMode> 
    <App /> 
  </React.StrictMode>
);
