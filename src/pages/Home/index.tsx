/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Home from './Home';

type PropsType = {
  authorizationToggle: boolean;
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage: FC<PropsType> = (props) => (
  <>
    <Helmet title="Home page" />
    <Home
      authorizationToggle={props.authorizationToggle}
      setAuthorization={props.setAuthorization}
    />
  </>
);

export default HomePage;
