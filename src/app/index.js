import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './app';
import createStore from './store/createStore';

const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

const render = (Component) => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <Router>
        <Switch>
          <Component />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', () => {
    /* eslint-disable global-require */
    const Routes = require('./app').default; // 动态路由，热加载写法
    render(Routes);
  });
}
