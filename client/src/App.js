import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

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
  const cookies = new Cookies();
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route path="/login" component={(props) => <><Nav {...props} config={config} user={cookies.get('user')} /><Login {...props} config={config} user={cookies.get('user')} /></>} />
          <Route path="/search/:searchValue" component={(props) => <><Nav {...props} config={config} user={cookies.get('user')} /><Search {...props} config={config} user={cookies.get('user')} /></>} />
          <Route path="/search" component={(props) => <><Nav {...props} config={config} user={cookies.get('user')} /><Search {...props} config={config} user={cookies.get('user')} /></>} />
          <Route path="/:type" component={(props) => <><Nav {...props} config={config} user={cookies.get('user')} /><PlantsList {...props} config={config} user={cookies.get('user')} /></>} exact />
          <Route path="/" component={(props) => <><Nav {...props} config={config} user={cookies.get('user')} /><Home {...props} config={config} user={cookies.get('user')} /></>} exact />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
