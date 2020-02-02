import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import config from './config';

import ScrollToTop from './components/ScrollToTop';

import Nav from './view/Nav/Nav';
import Home from './view/Home/Home';
import PlantsList from './view/PlantsList/PlantsList';
import Search from './view/Search/Search';
import Login from './view/Login/Login';
import Footer from './view/Footer/Footer';

import './reset.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route path="/login" component={(props) => <><Nav {...props} config={config} /><Login {...props} config={config} /></>} />
          <Route path="/search/:searchValue" component={(props) => <><Nav {...props} config={config} /><Search {...props} config={config} /></>} />
          <Route path="/search" component={(props) => <><Nav {...props} config={config} /><Search {...props} config={config} /></>} />
          <Route path="/:type" component={(props) => <><Nav {...props} config={config} /><PlantsList {...props} config={config} /></>} exact />
          <Route path="/" component={(props) => <><Nav {...props} config={config} /><Home {...props} config={config} /></>} exact />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
