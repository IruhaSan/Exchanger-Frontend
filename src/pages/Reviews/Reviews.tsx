/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { FC, useState } from 'react';
import _ from 'lodash';
import classes from './Reviews.module.scss';
import ReviewCard from '@/utils/components/ReviewCard/ReviewCard';
import BGimage from '@/assets/img/BgImg.svg';
import Container from '@/utils/components/Container';
import Button from '@/ui/Button/Button';
import LeftArrow from '@/assets/img/reviewsArrowLeft.svg';
import RightArrow from '@/assets/img/reviewsArrowRight.svg';
import { ReviewCardType } from '@/utils/model';

type PropsType = {
}

const Reviews: FC<PropsType> = () => {
  const AllReviews: ReviewCardType[] = [
    { clientName: 'Лилия', reviewDate: '24.11.2021', reviewBody: 'все отлично пришло все очень быстро и очень выгодный курс)))))' },
    { clientName: 'Олег', reviewDate: '10.11.2021', reviewBody: 'Очень быстрый обмен и прекрасный курс. Первый раз пользуюсь данным сервисом, одни положительные эмоции :)' },
    { clientName: 'Денис', reviewDate: '12.09.2021', reviewBody: 'Очень быстрый обмен. Всем рекомендую. Обменник самый лучший.' },
    { clientName: 'Лилия', reviewDate: '14.11.2021', reviewBody: 'Отлично, всё прошло без проблем, сервисом доволен' },
    { clientName: 'Евгений', reviewDate: '21.10.2021', reviewBody: 'Отличный обменник! Все очень Быстро!' },
    { clientName: 'Магомед', reviewDate: '09.10.2021', reviewBody: 'Хороший курс. Всё быстро. Спасибо' },
    { clientName: 'Евгений', reviewDate: '30.08.2021', reviewBody: 'Всё просто и быстро. Спасибо,классный обменник.' },
    { clientName: 'Юра', reviewDate: '12.11.2021', reviewBody: 'Очень быстрый обмен и прекрасный курс. Первый раз пользуюсь данным сервисом, одни положительные эмоции, все понравилось.' },
    { clientName: 'Магомед', reviewDate: '09.10.2021', reviewBody: 'Хороший курс' },
    { clientName: 'Александр', reviewDate: '02.09.2021', reviewBody: 'Выводил 0,02 битка, получил в течении получаса, как только крипта ушла с моего ресурса через 10 минут пришли на сбер одним платежем. рекомендую.' },
    { clientName: 'Саша', reviewDate: '30.02.2021', reviewBody: 'Ща, я в вов по-бырому' },
    { clientName: 'Лилия', reviewDate: '24.11.2021', reviewBody: 'все отлично пришло все очень быстро и очень выгодный курс)))))' },
    { clientName: 'Олег', reviewDate: '10.11.2021', reviewBody: 'Очень быстрый обмен и прекрасный курс. Первый раз пользуюсь данным сервисом, одни положительные эмоции :)' },
    { clientName: 'Денис', reviewDate: '12.09.2021', reviewBody: 'Очень быстрый обмен. Всем рекомендую. Обменник самый лучший.' },
    { clientName: 'Лилия', reviewDate: '14.11.2021', reviewBody: 'Отлично, всё прошло без проблем, сервисом доволен' },
    { clientName: 'Евгений', reviewDate: '21.10.2021', reviewBody: 'Отличный обменник! Все очень Быстро!' },
    { clientName: 'Магомед', reviewDate: '09.10.2021', reviewBody: 'Хороший курс. Всё быстро. Спасибо' },
    { clientName: 'Евгений', reviewDate: '30.08.2021', reviewBody: 'Всё просто и быстро. Спасибо,классный обменник.' },
    { clientName: 'Юра', reviewDate: '12.11.2021', reviewBody: 'Очень быстрый обмен и прекрасный курс. Первый раз пользуюсь данным сервисом, одни положительные эмоции, все понравилось.' },
    { clientName: 'Магомед', reviewDate: '09.10.2021', reviewBody: 'Хороший курс' },
    { clientName: 'Александр', reviewDate: '02.09.2021', reviewBody: 'Выводил 0,02 битка, получил в течении получаса, как только крипта ушла с моего ресурса через 10 минут пришли на сбер одним платежем. рекомендую.' },
    { clientName: 'Саша', reviewDate: '30.02.2021', reviewBody: 'Ща, я в вов по-бырому' },
  ];
  const [pageRender, setIndex] = useState(0);
  const pages = AllReviews.length % 10;
  const data = _.chunk(AllReviews, 10);
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <span>Что говорят клиенты</span>
      </div>
      <Container className={classes.client_reviews}>
        {data[pageRender].length > 0 && (
        <div className={classes.client_reviews_column}>
          {data[pageRender].length < 3 && data[pageRender].splice(0, data[pageRender].length).map((review, reviewIndex) => (
            <ReviewCard
              key={reviewIndex}
              reviewCard={review}
            />
          ))}
          {data[pageRender].length >= 3 && data[pageRender].splice(0, 3).map((review, reviewIndex) => (
            <ReviewCard
              key={reviewIndex}
              reviewCard={review}
            />
          ))}
        </div>
        )}
        {data[pageRender].length > 0 && (
        <div className={classes.client_reviews_column}>
          {data[pageRender].length < 4 && data[pageRender].splice(0, data[pageRender].length).map((review, reviewIndex) => (
            <ReviewCard
              key={reviewIndex}
              reviewCard={review}
            />
          ))}
          {data[pageRender].length >= 4 && data[pageRender].splice(0, 4).map((review, reviewIndex) => (
            <ReviewCard
              key={reviewIndex}
              reviewCard={review}
            />
          ))}
        </div>
        )}
        {data[pageRender].length > 0 && (
        <div className={classes.client_reviews_column}>
          {data[pageRender].length < 3 && data[pageRender].splice(0, data[pageRender].length).map((review, reviewIndex) => (
            <ReviewCard
              key={reviewIndex}
              reviewCard={review}
            />
          ))}
          {data[pageRender].length >= 3 && data[pageRender].splice(0, 3).map((review, reviewIndex) => (
            <ReviewCard
              key={reviewIndex}
              reviewCard={review}
            />
          ))}
        </div>
        )}
      </Container>
      {pageRender === pages && (
      <Container className={classes.client_reviews_slider}>
        <img className={classes.true_arrow} src={LeftArrow} alt="leftArrow" onClick={() => setIndex(pageRender - 1)} />
        <img className={classes.fake_arrow} src={RightArrow} alt="rightArrow" />
      </Container>
      )}
      {pageRender === 0 && (
      <Container className={classes.client_reviews_slider}>
        <img className={classes.fake_arrow} src={LeftArrow} alt="leftArrow" />
        <img className={classes.true_arrow} src={RightArrow} alt="rightArrow" onClick={() => setIndex(pageRender + 1)} />
      </Container>
      )}
      {pageRender !== 0 && pageRender !== pages && (
      <Container className={classes.client_reviews_slider}>
        <img className={classes.true_arrow} src={LeftArrow} alt="leftArrow" onClick={() => setIndex(pageRender - 1)} />
        <img className={classes.true_arrow} src={RightArrow} alt="rightArrow" onClick={() => setIndex(pageRender + 1)} />
      </Container>
      )}
      <Container className={classes.feedback}>
        <span>Что говорят клиенты</span>
        <div className={classes.feedback__initials}>
          <div className={classes.feedback__initials__name}>
            <span>
              Ваше имя
              <strong>*</strong>
              :
            </span>
            <input />
          </div>
          <div className={classes.feedback__initials__email}>
            <span>
              Ваш e-mail
              <strong>*</strong>
              :
            </span>
            <input />
          </div>
        </div>
        <div className={classes.feedback__body}>
          <div className={classes.feedback__body__text}>
            <span>
              Текст отзыва
              <strong>*</strong>
              :
            </span>
            <input />
          </div>
          <div className={classes.feedback__body__captcha}>
            <span>
              Введите ответ (13 * 9):
            </span>
            <input />
          </div>
        </div>
        <div className={classes.feedback__send}>
          <Button>
            Оставить отзыв
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Reviews;
