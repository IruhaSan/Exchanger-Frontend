import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Exchange from './Exchange';

const ExchangePage: FC = () => (
  <>
    <Helmet title="exch page" />
    <Exchange exchangeCurrencies={{ from: 'anal', to: 'gob' }} />
  </>
);

export default ExchangePage;
