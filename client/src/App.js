import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import config from './config';

import Home from './view/Home/Home';

import './reset.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={(props) => <Home {...props} config={config} />} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
