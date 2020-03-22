import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Link } from 'react-router-dom';

class Track extends Component {
  componentDidMount() {
    const { urlId } = this.props.match.params;

    this.props.getTrack(urlId);
  }

  renderContent() {
    if (!this.props.track.length) return null;

    return this.props.track.map(el => {
      return (
        <tr key={el.id}>
          <td className="border px-4 py-2">{el.ipAddress}</td>
          <td className="border px-4 py-2">
            <a href={el.refererUrl} className="link">
              {el.refererUrl}
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
    if (!this.props.track.length)
      return (
        <div className="text-xl center-vh text-align-center">
          <h3 className="mb-5">No record yet :(</h3>
          <Link
            to="/history"
            class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </Link>
        </div>
      );

    return (
      <div className="center-vh text-align-center">
        <table className="mb-5">
          <thead>
            <tr className="text-align-left">
              <th className="px-4 py-2">IP Address</th>
              <th className="px-4 py-2">Referer URL</th>
            </tr>
          </thead>
          <tbody>{this.renderContent()}</tbody>
        </table>
        <Link
          to="/history"
          class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ track }) => {
  return { track };
};

export default connect(mapStateToProps, actions)(Track);
