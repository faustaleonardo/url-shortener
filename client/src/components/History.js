import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

class History extends Component {
  componentDidMount() {
    this.props.getHistory();
  }

  renderContent() {
    if (!this.props.history.length) return null;

    return this.props.history.map(el => {
      return (
        <tr key={el.id}>
          <td className="border px-4 py-2">
            <a href={el.url} className="link" target="new">
              {el.url}
            </a>
          </td>
          <td className="border px-4 py-2">
            <a href={el.shortUrl} className="link" target="new">
              {el.shortUrl}
            </a>
          </td>
          <td className="border px-4 py-2">{el.clicks}</td>
          <td className="border px-4 py-2">
            <Link
              to={'/track/' + el.id}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Show
            </Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    if (!this.props.history.length)
      return (
        <div className="text-xl center-vh">
          <h3>No record yet :)</h3>
        </div>
      );

    return (
      <div className="center-vh">
        <table>
          <thead>
            <tr className="text-align-left">
              <th className="px-4 py-2">Long URL</th>
              <th className="px-4 py-2">Short URL</th>
              <th className="px-4 py-2">Clicks</th>
              <th className="px-4 py-2">Tracks</th>
            </tr>
          </thead>
          <tbody>{this.renderContent()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ history }) => {
  return { history };
};

export default connect(mapStateToProps, actions)(History);
