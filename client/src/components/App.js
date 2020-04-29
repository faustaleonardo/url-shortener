import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import History from './History';
import Track from './Track';
import Stats from './Stats';

class App extends Component {
  state = { loading: false };

  async componentDidMount() {
    await this.props.fetchUser();
  }

  render() {
    return (
      <div className="container mx-auto">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/history" component={History}></Route>
            <Route exact path="/tracks/:urlId" component={Track}></Route>
            <Route exact path="/stats" component={Stats}></Route>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
