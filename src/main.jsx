import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import theme from './theme.js';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <App />
  </CssVarsProvider>
);
