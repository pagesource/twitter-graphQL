import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    tweet: (Component) => Relay.QL`
       query TwitterAPI {
                store{
                  ${Component.getFragment('tweet')}
                }
            }
    `
  };
  static routeName = 'AppHomeRoute';
}
