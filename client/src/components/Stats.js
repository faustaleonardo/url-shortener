import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';

import { Line } from 'react-chartjs-2';

class Stats extends Component {
  state = {
    groupBy: 'day',
    chartData: {
      labels: [],
      datasets: [
        {
          label: '',
          backgroundColor: 'rgb(56, 178, 172)',
          borderColor: 'rgb(56, 178, 172)',
          data: []
        }
      ]
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { groupBy } = this.state;
    if (groupBy !== prevState.groupBy) await this.fetchData();
  }

  fetchData = async () => {
    await this.props.getStats(this.state.groupBy);
    if (this.props.stats.length) {
      const labelsValue = this.props.stats.map(el => el.group_by);
      const countValue = this.props.stats.map(el => el.count * 1);

      this.setState(prevState => ({
        chartData: {
          ...prevState.chartData,
          labels: labelsValue,
          datasets: prevState.chartData.datasets.map(el => ({
            ...el,
            label: `Based on ${this.state.groupBy}`,
            data: countValue
          }))
        }
      }));
    }
  };

  handleSelectChange = event => {
    this.setState({ groupBy: event.target.value });
  };

  render() {
    if (this.props.auth === false) return <Redirect to="/login" />;

    return (
      <div className="text-align-center mt-10">
        <div className="inline-block relative w-64">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={this.state.groupBy}
            onChange={this.handleSelectChange}
          >
            <option value="day">Based on day</option>
            <option value="month">Based on month</option>
            <option value="year">Based on year</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <div className="mt-20">
          <Line
            data={this.state.chartData}
            height={500}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, stats }) => {
  return { auth, stats };
};

export default connect(mapStateToProps, actions)(Stats);
