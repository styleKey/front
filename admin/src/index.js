import React from 'react';
import { createRoot } from 'react-dom/client'; // createRoot를 react-dom/client에서 가져옴
import App from './App';

createRoot(document.getElementById('root')).render(<App />);
