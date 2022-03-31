/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useRouteMatch } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';
import Footer from './components/Footer';
import Header from './components/Header';
import classes from './Layout.module.scss';
import ROUTES from '@/const/routes';
import AuthorizationCard from '../AuthorizationCard';
import UserContext from './components/Context/UserContext';
import { UserDataType } from '@/utils/model';

type PropsType = {
  children: React.ReactNode
  authorizationToggle: boolean;
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>;
}
const Layout: FC<PropsType> = (props) => {
  const [userAccessToken, setAccessToken] = useState('');
  const value = useMemo(() => ({ userAccessToken, setAccessToken }), [userAccessToken, setAccessToken]);
  const match = useRouteMatch(ROUTES.HOME);
  // const [authorizationToggle, setAuthorization] = useState(false);
  const [registerCard, setRegister] = useState(false);
  const [userData, setUserData] = useState<UserDataType | null>(null);
  useEffect(() => {
    axios.get('http://localhost:8080/api/user', {
      headers: {
        'x-auth-token': window.localStorage.getItem('access_token'),
      },
    }).then((res) => {
      setUserData(res.data);
    });
    (userAccessToken !== '') && window.localStorage.setItem('access_token', userAccessToken);
  }, [userAccessToken]);

  return (
    <div>
      {props.authorizationToggle && (
        <UserContext.Provider value={value}>
          <div className={classes.authorization}>
            <AuthorizationCard
              authorizationToggle={props.authorizationToggle}
              setAuthorization={props.setAuthorization}
              registerCard={registerCard}
              setRegister={setRegister}
            />
          </div>
        </UserContext.Provider>
      )}

      {registerCard && (
      <UserContext.Provider value={value}>
        <div className={classes.authorization}>
          <AuthorizationCard
            authorizationToggle={props.authorizationToggle}
            setAuthorization={props.setAuthorization}
            registerCard={registerCard}
            setRegister={setRegister}
          />
        </div>
      </UserContext.Provider>
      )}
      <UserContext.Provider value={value}>
        <Header
          noSecondBlock={match?.isExact}
          authorizationToggle={props.authorizationToggle}
          setAuthorization={props.setAuthorization}
          registerCard={registerCard}
          setRegister={setRegister}
        />
      </UserContext.Provider>
      <UserContext.Provider value={value}>
        <div
          className={clsx({
            [classes.root]: true,
            [classes.root__darken]: props.authorizationToggle || registerCard,
          })}
        >
          {props.children}
        </div>
      </UserContext.Provider>
      <Footer />
    </div>
  );
};

export default Layout;
