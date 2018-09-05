import React from 'react';
import Switch from 'react-router/Switch';
import Route from 'react-router/Route';

const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
  (routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          exact={route.exact}
          key={route.key || i}
          path={route.path}
          render={props =>
            (route.render ? (
              route.render(props)
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            ))
          }
          strict={route.strict}
        />
      ))}
    </Switch>
  ) : null);

export default renderRoutes;
