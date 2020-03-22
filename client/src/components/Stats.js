import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';

import { Line, Bar, Pie } from 'react-chartjs-2';

class Stats extends Component {
  componentDidMount() {
    console.log();
  }

  state = {
    chartData: {
      labels: ['Red', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Based on month',
          backgroundColor: 'rgb(56, 178, 172)',
          borderColor: 'rgb(56, 178, 172)',
          data: [0, 10, 5, 2, 20, 30, 45]
        }
      ]
    }
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="mt-10">
          <Line data={this.state.chartData} height={500} width={700} />
        </div>
        <div className="mt-10">
          <Bar data={this.state.chartData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, actions)(Stats);
