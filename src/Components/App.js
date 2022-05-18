import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import '../App.css'
import Bus from './Abhibus/Bus';
import Hotels from './Abhibus/Hotels';
import Navbar from './Abhibus/Navbar';
import Trains from './Abhibus/Trains';
import Footer from './Abhibus/Footer';
import PageNotFound from './Abhibus/PageNotFound'
import Buslist from './Abhibus/Buslist';
import Login from './Login/Login'

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Bus} />
            <Route exact path="/login" component={Login} />
            <Route path="/hotels" component={Hotels} />
            <Route path="/trains" component={Trains} />
            <Route path="/404" component={PageNotFound} />
            <Route path="/bus_search/:source/:destination" component={Buslist} />
            <Redirect to="/404" />
          </Switch>
          {/* <Footer /> */}
        </Router>

      </>
    )
  }

}


export default App;

