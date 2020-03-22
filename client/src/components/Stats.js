import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Redirect } from 'react-router-dom';

class Stats extends Component {
  componentDidMount() {}

  render() {
    if (!this.props.auth) {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, actions)(Stats);
