// import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import App from './App.jsx';
import theme from './theme.js';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmProvider } from 'material-ui-confirm';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { injectStore } from './utils/authorizeAxios.js';

const persistor = persistStore(store);
// Cấu hình react-router-dom với browserRouter
import { BrowserRouter } from 'react-router-dom';
// Ky thuat inject store
injectStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename="/">
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
            <GlobalStyles
              styles={{
                a: {
                  textDecoration: 'none'
                }
              }}
            />
            <CssBaseline />
            <App />
            <ToastContainer position="bottom-left" theme="colored" />
          </ConfirmProvider>
        </CssVarsProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
