import React from 'react';
import Relay from 'react-relay';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Twitterati</h1>
          <ul>
            {this.props.tweet.tweet.map(tweet =>
              <li key={tweet.id}><small>id: {tweet.id}</small> <br></br> {tweet.text}  <br></br>-- @<i>{tweet.user.screen_name}</i></li>
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
          text,
          user{
            screen_name
          }
        }
      }
    `,
  },
});
