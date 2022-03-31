import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQ from './FAQ';

const FAQPage: FC = () => (
  <>
    <Helmet title="FAQ page" />
    <FAQ />
  </>
);

export default FAQPage;
