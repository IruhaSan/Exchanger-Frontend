import React, { FC } from 'react';
import AccountAsideMenu from './components/AccountAsideMenu/Account';
import classes from './AccountLayout.module.scss';
import Container from '../Container/Container';

type PropsType = {
  children: React.ReactNode
}

const AccountLayout: FC<PropsType> = ({ children }) => {
  const poo = 0;
  return (
    <Container className={classes.root}>
      <AccountAsideMenu />
      {children}
    </Container>
  );
};

export default AccountLayout;
