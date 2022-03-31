import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import AccountSecuritySettings from './AccountSecuritySettings';

const AccountSecuritySettingsPage: FC = () => (
  <>
    <Helmet title="Contacts page" />
    <AccountSecuritySettings />
  </>
);

export default AccountSecuritySettingsPage;
