import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from './style/theme';
import { ThemeProvider } from 'styled-components';
import Global from './style/Global';


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
      <Global />
    </React.StrictMode>
  </ThemeProvider>
  ,
  document.getElementById('root')
);


