import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import NotFound from './NotFound';

const NotFoundPage: FC = () => (
  <>
    <Helmet title="NotFound page" />
    <NotFound />
  </>
);

export default NotFoundPage;
