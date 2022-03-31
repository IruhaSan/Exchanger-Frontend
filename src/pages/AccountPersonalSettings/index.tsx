import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import AccountPersonalSettings from './AccountPersonalSettings';

const AccountPersonalSettingsPage: FC = () => (
  <>
    <Helmet title="AccountSecuritySettings page" />
    <AccountPersonalSettings />
  </>
);

export default AccountPersonalSettingsPage;
