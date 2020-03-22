import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import showAlert from '../utils/showAlert';

class Landing extends Component {
  state = { url: '' };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClear = () => {
    this.setState({ url: '' });
  };

  handleSubmit = async event => {
    event.preventDefault();

    if (!this.state.url) {
      showAlert('error', 'Oops...', 'Link must be filled!');
      return;
    }

    await this.props.postUrl(this.state);

    if (this.props.error) {
      showAlert('error', 'Oops...', this.props.error);
      this.props.clearError();
      return;
    }
  };

  renderContent() {
    if (this.props.url.url) {
      return (
        <table className="table-auto mt-10">
          <thead>
            <tr className="text-align-left">
              <th className="py-2">Long URL</th>
              <th className="py-2">Short URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">
                <a className="link" href={this.props.url.url} target="new">
                  {this.props.url.url}
                </a>
              </td>
              <td className="py-2">
                <a className="link" href={this.props.url.shortUrl} target="new">
                  {this.props.url.shortUrl}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  }

  render() {
    return (
      <div className="landing-section center-vh">
        <form onSubmit={this.handleSubmit}>
          <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Link"
              aria-label="Link"
              name="url"
              value={this.state.url}
              onChange={this.handleChange}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Shorten
            </button>
            <button
              className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
              type="button"
              onClick={this.handleClear}
            >
              Clear
            </button>
          </div>
        </form>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ error, url }) => {
  return { error, url };
};

export default connect(mapStateToProps, actions)(Landing);
