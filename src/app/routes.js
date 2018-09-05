import React from 'react';
import universal from 'react-universal-component';
import { Redirect } from 'react-router';
import { increment } from './pages/Home/modules/home';
import Root from './pages/Root';
import Login from './pages/Login';

const rootRoutes = {
  routes: [
    {
      path: '/app',
      exact: true,
      component: () => (
        <Redirect
          to={{
            pathname: '/app/home'
          }}
        />
      )
    },
    {
      path: '/app/home',
      component: universal(() => import('./pages/Home')),
      fetchData: store => store.dispatch(increment()) // 预加载
    },
    {
      path: '/app/list',
      component: universal(() => import('./pages/List'))
    },
    {
      path: '/app/detail',
      component: universal(() => import('./pages/Detail'))
    }
  ]
};

const routes = [
  {
    path: '/',
    exact: true,
    component: (props) => {
      console.log('1111');
      return props.authed ? (
        <Redirect
          to={{
            pathname: '/app/home'
          }}
        />
      ) : (
        <Redirect to="/login" />
      );
    }
  },
  {
    path: '/app',
    // render: (props) => {
    //   console.log('2222');
    //   console.log(props);
    //   return true ? <Root {...props} route={rootRoutes} /> : <Redirect to="/login" />;
    // },
    component: (props) => {
      console.log('2222');
      return props.authed ? (
        <Root {...props} route={rootRoutes} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            successPath: props.location.pathname
          }}
        />
      );
    },
    routes: rootRoutes.routes
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    component: universal(() => import('./notfound'))
  }
];

export default routes;
