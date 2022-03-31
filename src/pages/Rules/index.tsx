import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Rules from './Rules';

const RulesPage: FC = () => (
  <>
    <Helmet title="Rules page" />
    <Rules />
  </>
);

export default RulesPage;
