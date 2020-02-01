import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import config from './config';

import Nav from './view/Nav/Nav';
import Home from './view/Home/Home';
import PlantsList from './view/PlantsList/PlantsList';
import Footer from './view/Footer/Footer';

import './reset.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/:type" component={(props) => <PlantsList {...props} config={config} />} exact />
          <Route path="/" component={(props) => <Home {...props} config={config} />} exact />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
