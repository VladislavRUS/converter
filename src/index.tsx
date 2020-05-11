import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'entry/App';
import configureStore from 'configureStore';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from 'theme';

const history = createHashHistory();

// @ts-ignore
const initialState = window.initialReduxState;

const store = configureStore(history, initialState);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
