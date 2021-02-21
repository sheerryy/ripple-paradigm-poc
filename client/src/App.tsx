import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import { store } from './redux/store';
import { routes } from './routes';
import { NavBar } from './components';

import './App.css';
import rootSaga from "./redux/sagas";
import SocketWorker from "./SocketWorker";

const THEME = createMuiTheme();
const theStore = store();
theStore.runSaga(rootSaga);

function App() {
  return (
    <MuiThemeProvider theme={THEME}>
      <Provider store={theStore}>
        <div className="App">
          <SocketWorker />
          <NavBar/>
          <Router>
            <Switch>
              {
                routes.map(
                  ({...props}, key) => (
                    <Route key={key} {...props}/>
                  )
                )
              }
            </Switch>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
