import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatInterface from './ChatInterface.js';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<ChatInterface />);