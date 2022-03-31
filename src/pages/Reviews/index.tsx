import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Reviews from './Reviews';

const ReviewsPage: FC = () => (
  <>
    <Helmet title="Reviews page" />
    <Reviews />
  </>
);

export default ReviewsPage;
