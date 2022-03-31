import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Contacts from './Contacts';

const ContactsPage: FC = () => (
  <>
    <Helmet title="Contacts page" />
    <Contacts />
  </>
);

export default ContactsPage;
