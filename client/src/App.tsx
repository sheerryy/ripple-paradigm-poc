import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import { routes } from './routes';
import { NavBar } from './components';

import './App.css';

const THEME = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme={THEME}>
      <div className="App">
        <NavBar/>
        <Router>
          <Switch>
            {
              routes.map(
                ({...props}) => (
                  <Route {...props}/>
                )
              )
            }
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
