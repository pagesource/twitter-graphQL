import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Tweet list</h1>
          <ul>
            {this.props.tweet.tweet.map(tweet =>
              <li key={tweet.id}>{tweet.text} (ID: {tweet.id})</li>
            )}
          </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    tweet: () => Relay.QL`
      fragment on Viewer {
        tweet{
          id,
          text
        }
      }
    `,
  },
});
