import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Widget list</h1>
        <h1>id: {this.props.search.id}</h1>
        <h1>text: {this.props.tweet.text}</h1>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    tweet: () => Relay.QL`
      fragment on Tweet {
        id,
        text
      }
    `,
  },
});
