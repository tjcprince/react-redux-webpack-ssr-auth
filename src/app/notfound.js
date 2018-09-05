import React from 'react';
import { Route } from 'react-router-dom';

const NotFound = () => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404;
      }
      return (
        <div>
          <h1>你输入的地址不正确哟!</h1>
        </div>
      );
    }}
  />
);

export default NotFound;
