import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import AccountOperations from './AccountOperations';

const AccountOperationsPage: FC = () => (
  <>
    <Helmet title="AccountSecuritySettings page" />
    <AccountOperations />
  </>
);

export default AccountOperationsPage;
