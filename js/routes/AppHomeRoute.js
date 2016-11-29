import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    tweet: () => Relay.QL`
      query TwitterAPI{
        search(q: "reactjs")
      }
    `,
  };
  static routeName = 'AppHomeRoute';
}
