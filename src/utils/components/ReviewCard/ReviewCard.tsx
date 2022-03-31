/* eslint-disable react/require-default-props */
import React, { FC } from 'react';
import Container from '../Container/Container';
import classes from './ReviewCard.module.scss';
import { ReviewCardType } from '@/utils/model';

type PropsType = {
    reviewCard: ReviewCardType;
}

const ReviewCard: FC<PropsType> = ({ reviewCard }) => {
  const poop = 0;
  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.client_card}>
          <div className={classes.card_text}>
            <span>{reviewCard.clientName}</span>
            <span>{reviewCard.reviewDate}</span>
            <span>{reviewCard.reviewBody}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReviewCard;
