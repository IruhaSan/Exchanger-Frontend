import React, {
  FC, useContext,
} from 'react';
import {
  Redirect,
  Route,
  RouteProps,
} from 'react-router-dom';
import ROUTES from '../../../const/routes';
import UserContext from '../Layout/components/Context/UserContext';

const ProtectedRoute: FC<RouteProps> = ({ ...rest }) => {
  const { userAccessToken } = useContext(UserContext);
  return (
    window.localStorage.getItem('access_token') ? (
      <Route
        {...rest}
      />
    ) : <Redirect to={ROUTES.HOME} />
  );
};

export default ProtectedRoute;
