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

class App extends React.Component {

  state = {
    user: undefined,
  }

  componentDidMount() {
    const cookies = new Cookies();
    this.setState({ user: cookies.get('user') })
  }

  logout() {
    const cookies = new Cookies();
    cookies.remove('user');
    this.setState({ user: undefined })
  }

  render() {
    const cookies = new Cookies();
    return (
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <Switch>
            <Route path="/login" component={(props) =>
              <>
                <Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} />
                <Login {...props} config={config} user={cookies.get('user')} />
              </>}
            />
            <Route path="/search/:searchValue" component={(props) =>
              <>
                <Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} />
                <Search {...props} config={config} user={cookies.get('user')} />
              </>}
            />
            <Route path="/search" component={(props) =>
              <>
                <Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} />
                <Search {...props} config={config} user={cookies.get('user')} />
              </>}
            />
            <Route path="/:type" component={(props) =>
              <>
                <Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} />
                <PlantsList {...props} config={config} user={cookies.get('user')} />
              </>} exact
            />
            <Route path="/" component={(props) =>
              <>
                <Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} />
                <Home {...props} config={config} user={cookies.get('user')} />
              </>} exact
            />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
