// import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import theme from './theme.js';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmProvider } from 'material-ui-confirm';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';

// Cấu hình react-router-dom với browserRouter
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            allowClose: false,
            // dialogProps: {
            //   maxWidth: 'xs'
            // },
            confirmationButtonProps: {
              color: 'secondary',
              variant: 'outlined'
            },
            cancellationButtonProps: {
              color: 'inherit',
              variant: 'outlined'
            }
          }}
        >
          <CssBaseline />
          <App />
          <ToastContainer position="bottom-left" theme="colored" />
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>
);
