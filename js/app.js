import 'babel-polyfill';
import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <MuiThemeProvider>

    <Relay.Renderer
      environment={Relay.Store}
      Container={App}
      queryConfig={new AppHomeRoute()}
      render={({ done, error, props }) => {
        if (props) {
          return <App {...props} />;
        } else {
          return <div>Loading...</div>;
        }
      }}
    />
  </MuiThemeProvider>

  ,
  document.getElementById('root')
);