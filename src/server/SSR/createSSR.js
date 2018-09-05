import React from 'react';
import fetch from 'isomorphic-fetch';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import Html from './html';
import routes from '../../app/routes';
import App from '../../app/app';
import appConfig from '../../app/config';

import createStore from '../../app/store/createStore';

const store = createStore();

async function getUsers(req) {
  let token = '';
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    const response = await fetch(`${appConfig.api}/getUser`, {
      method: 'Get',
      headers: {
        Authorization: token
      }
    });
    const user = await response.json();
    user.then(data => data);
  }
  return null;
}

export default function createSSR(assets) {
  return async (req, res) => {
    let token = '';
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      const response = await fetch(`${appConfig.api}/getUser`, {
        method: 'Get',
        headers: {
          Authorization: token
        }
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        if (data.success) {
          store.dispatch({
            type: 'session/CHANGE_AUTHED',
            authed: true
          });
        } else {
          store.dispatch({
            type: 'session/CHANGE_AUTHED',
            authed: false
          });
        }
      }
    } else {
      store.dispatch({
        type: 'session/CHANGE_AUTHED',
        authed: false
      });
    }

    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({ route }) => {
      const fetchData = route.fetchData; // 预加载
      return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null);
    });
    return Promise.all(promises).then((data) => {
      const context = {};
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      );
      if (context.status === 404) {
        res.status(404);
      }
      const renderContent = renderToString(<Html {...{ store, content, assets }} />);

      res.send(`<!doctype html>\n${renderContent}`);
    });
  };
}
