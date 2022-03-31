/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import Container from '@/utils/components/Container';
import BackgroundImage from '@/assets/img/BackgroundImage.png';
import ObmenkoLogo from '@/assets/img/ObmenkoLogo.png';
import ShuffleImg from '@/assets/img/shuffle.png';
import RocketImg from '@/assets/img/rocket.svg';
import BgImage from '@/assets/img/BgImg.svg';
import LockImg from '@/assets/img/zamochek.svg';
import ExchangeImg from '@/assets/img/money.png';
import classes from './Home.module.scss';
import Button from '@/ui/Button/Button';
import ROUTES from '@/const/routes';
import Select from '@/ui/Select';
import CURRENCY_LIST, { CurrencyUnitEnum } from '@/const/currencies';
import Input from '@/ui/Input/Input';
import SliderArrow from '@/assets/img/whiteArrow.svg';
import VtbImg from '@/assets/img/vtb.png';
import ReviewCard from '@/utils/components/ReviewCard';
import { CurrencyType } from '@/utils/model';
import Context from '@/utils/components/Context/Context';
import UserContext from '@/utils/components/Layout/components/Context/UserContext';

type PropsType = {
  authorizationToggle: boolean;
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>;
}

type ReviewsType = {
  clientName: string;
  reviewDate: string;
  reviewBody: string;
}

const Home: FC<PropsType> = (props) => {
  const history = useHistory();
  const memoGoTo = useCallback(goTo, [history]);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [reviews, setReviews] = useState<ReviewsType[]>([
    { clientName: 'Лилия', reviewDate: '24.11.2021', reviewBody: '1все отлично пришло все очень быстро и очень выгодный курс)))))' },
    { clientName: 'Олег', reviewDate: '10.11.2021', reviewBody: '2Очень быстрый обмен и прекрасный курс. Первый раз пользуюсь данным сервисом, одни положительные эмоции :)' },
    { clientName: 'Денис', reviewDate: '12.09.2021', reviewBody: '3Очень быстрый обмен. Всем рекомендую. Обменник самый лучший.' },
    { clientName: 'Лилия', reviewDate: '14.11.2021', reviewBody: '4Отлично, всё прошло без проблем, сервисом доволен' },
    { clientName: 'Евгений', reviewDate: '21.10.2021', reviewBody: '5Отличный обменник! Все очень Быстро!' },
    { clientName: 'Магомед', reviewDate: '09.10.2021', reviewBody: '6Хороший курс. Всё быстро. Спасибо' },
    { clientName: 'Евгений', reviewDate: '30.08.2021', reviewBody: '7Всё просто и быстро. Спасибо,классный обменник.' },
    { clientName: 'Юра', reviewDate: '12.11.2021', reviewBody: '8Очень быстрый обмен и прекрасный курс. Первый раз пользуюсь данным сервисом, одни положительные эмоции, все понравилось.' },
    { clientName: 'Магомед', reviewDate: '09.10.2021', reviewBody: '9Хороший курс' },
    { clientName: 'Александр', reviewDate: '02.09.2021', reviewBody: 'Выводил 0,02 битка, получил в течении получаса, как только крипта ушла с моего ресурса через 10 минут пришли на сбер одним платежем. рекомендую.' },
    { clientName: 'Саша', reviewDate: '30.02.2021', reviewBody: '10Ща, я в вов по-бырому' },
    { clientName: 'Лилия', reviewDate: '24.11.2021', reviewBody: 'все отлично пришло все очень быстро и очень выгодный курс)))))' },
    { clientName: 'Олег', reviewDate: '10.11.2021', reviewBody: '11Очень быстрый обмен и прекрасный курс. Первый раз пользуюсь данным сервисом, одни положительные эмоции :)' },
    { clientName: 'Денис', reviewDate: '12.09.2021', reviewBody: 'Очень быстрый обмен. Всем рекомендую. Обменник самый лучший.' },
    { clientName: 'Лилия', reviewDate: '14.11.2021', reviewBody: '12Отлично, всё прошло без проблем, сервисом доволен' },
    { clientName: 'Евгений', reviewDate: '21.10.2021', reviewBody: '13Отличный обменник! Все очень Быстро!' },
    { clientName: 'Магомед', reviewDate: '09.10.2021', reviewBody: '14Хороший курс. Всё быстро. Спасибо' },
    { clientName: 'Евгений', reviewDate: '30.08.2021', reviewBody: '15Всё просто и быстро. Спасибо,классный обменник.' },
    { clientName: 'Юра', reviewDate: '12.11.2021', reviewBody: '16Очень быстрый обмен и прекрасный курс. Первый раз пользуюсь данным сервисом, одни положительные эмоции, все понравилось.' },
    { clientName: 'Магомед', reviewDate: '09.10.2021', reviewBody: '17Хороший курс' },
    { clientName: 'Александр', reviewDate: '02.09.2021', reviewBody: '18Выводил 0,02 битка, получил в течении получаса, как только крипта ушла с моего ресурса через 10 минут пришли на сбер одним платежем. рекомендую.' },
    { clientName: 'Саша', reviewDate: '30.02.2021', reviewBody: 'Ща, я в вов по-бырому' },
    { clientName: 'Александр', reviewDate: '02.09.2021', reviewBody: '18Выводил 0,02 битка, получил в течении получаса, как только крипта ушла с моего ресурса через 10 минут пришли на сбер одним платежем. рекомендую.' },
    { clientName: 'Саша', reviewDate: '30.02.2021', reviewBody: 'Ща, я в вов по-бырому' },
  ]);
  const [data, setData] = useState<ReviewsType[][]>(_.chunk(reviews, 4));
  const [index, setIndex] = useState(0);
  const [currencyIndexFrom, setCurrencyIndexFrom] = useState(0);
  const [currencyIndexTo, setCurrencyIndexTo] = useState(1);
  const [currencyValueFrom, setCurrencyValueFrom] = useState(1);
  const [currencyValueTo, setCurrencyValueTo] = useState(0);
  const [unitInfo, setUnitInfo] = useState<CurrencyType>();
  const [oneExchange, setOneExchange] = useState(0);
  const [allInfo, setAllInfo] = useState<any>([]);
  const { userAccessToken } = useContext(UserContext);
  const handleLogin = () => {
    props.setAuthorization(!props.authorizationToggle);
    document.body.style.overflow = 'hidden';
  };

  const value = useContext(Context);
  async function calculatedSum() {
    await axios.get('http://localhost:8080/api/bid/pairs').then((res) => {
      const unitFrom = CURRENCY_LIST[currencyIndexFrom].unit;
      const unitTo = CURRENCY_LIST[currencyIndexTo].unit;
      setAllInfo(res);
      setOneExchange(res.data.data[unitFrom][unitTo]);
      setCurrencyValueTo(res.data.data[unitFrom][unitTo] * currencyValueFrom);
    });
  }

  async function getUnitInfo() {
    await axios.get('http://localhost:8080/api/bid/currencies').then((res) => {
      res.data.data.forEach((el: any) => {
        if (el.unit === CURRENCY_LIST[currencyIndexFrom].unit) {
          setUnitInfo(el);
        }
      });
    });
  }

  useEffect(() => {
    calculatedSum();
  }, [currencyIndexTo, currencyIndexFrom, currencyValueFrom]);

  useEffect(() => {
    getUnitInfo();
  }, [currencyIndexTo, currencyIndexFrom]);

  return (
    <div className={classes.root}>
      <img src={BackgroundImage} className={classes.backgroundImage} alt="" />
      <Container className={classes.menu}>
        <div className={classes.content}>
          <img src={ObmenkoLogo} alt="" />
          <div className={classes.block}>
            <div>
              <Button className={classes.Button} onClick={memoGoTo(ROUTES.HOME)}>Главная</Button>
            </div>
            <div>
              <Button className={classes.Button} onClick={memoGoTo(ROUTES.RULES)}>Правила сайта</Button>
            </div>
            <div>
              <Button className={classes.Button} onClick={memoGoTo(ROUTES.FAQ)}>FAQ</Button>
            </div>
            <div>
              <Button className={classes.Button} onClick={memoGoTo(ROUTES.REVIEWS)}>Отзывы</Button>
            </div>
            <div>
              <Button className={classes.Button} onClick={memoGoTo(ROUTES.CONTACTS)}>Контакты</Button>
            </div>
          </div>
        </div>
      </Container>
      <Container className={classes.upper_main}>
        <div>
          <p>
            Точный обмен криптовалют

            <span>и цифровых ценностей</span>
          </p>
        </div>
        <div className={classes.card}>
          <div className={classes.white_cloud_main}>
            <div className={classes.white_cloud_to}>
              <p>Отдаете</p>
              <div>
                <div>
                  <Select data={CURRENCY_LIST} value={CURRENCY_LIST[currencyIndexFrom]} onChange={(e) => setCurrencyIndexFrom(CURRENCY_LIST.indexOf(e))} />
                </div>
                <Input value={currencyValueFrom} onChange={setCurrencyValueFrom} />
              </div>
            </div>
            <p>
              Курс обмена:
              <span>
                {' '}
                1
                {' '}
                {CURRENCY_LIST[currencyIndexFrom].unit}
                {' '}
                =
                {' '}
                {oneExchange}
                {' '}
                {CURRENCY_LIST[currencyIndexTo].unit}
              </span>
            </p>
            <h1>
              Резерв:
              <span>
                {' '}
                {unitInfo?.reserve}
                {' '}
                {CURRENCY_LIST[currencyIndexFrom].unit}
                {' '}
              </span>
              <strong onClick={() => console.log('ti pidor')}>Не хватает?</strong>
            </h1>
            <img src={ShuffleImg} alt="exchange" />
            <div className={classes.white_cloud_taking}>
              <p>Получаете</p>
              <div>
                <div>
                  <Select data={CURRENCY_LIST} value={CURRENCY_LIST[currencyIndexTo]} onChange={(e) => setCurrencyIndexTo(CURRENCY_LIST.indexOf(e))} />
                </div>
                <Input onChange={() => console.log('first')} value={currencyValueTo} />
              </div>
              <span>max.: 4000000 RUB</span>
            </div>
            {!userAccessToken && (
            <span>
              <strong onClick={handleLogin}>Войдите </strong>
              в аккаунт и получите персональную скидку
            </span>
            )}
            <Button onClick={memoGoTo(ROUTES.EXCHANGE_STEP)}>ОБМЕНЯТЬ</Button>
          </div>
        </div>
      </Container>
      <Container className={classes.about_main}>
        <div>
          <img src={RocketImg} alt="rocket" />
          <p>Скорость</p>
          <span>Мы отводим себе не более 15 минут на конвертацию вашей заявки</span>
        </div>
        <div>
          <img src={LockImg} alt="lock" />
          <p>Защита данных</p>
          <span>Мы не храним или передаем ваши данные. Все данные передаются по защищенному SSL каналу</span>
        </div>
        <div>
          <img src={ExchangeImg} alt="exchange" />
          <p>Выгодный курс</p>
          <span>Профессиональный подход к курсообразованию делает наши курсы лучшими в рунете</span>
        </div>
      </Container>

      <Container className={classes.reviews_main}>
        <img src={BgImage} alt="back" />
        <div className={classes.control_slider}>
          <span>Отзывы —</span>
          <p>Что говорят клиенты</p>
          {index === 0 && (
            <div>
              <img src={SliderArrow} className={classes.leftArrowDisabled} alt="leftarrow" />
              <img src={SliderArrow} className={classes.rightArrowEnabled} onClick={() => setIndex(index + 1)} alt="rightarrow" />
            </div>
          )}
          {(index !== 0 && index !== data.length - 1) && (
            <div>
              <img src={SliderArrow} className={classes.leftArrowEnabled} onClick={() => setIndex(index - 1)} alt="leftarrow" />
              <img src={SliderArrow} className={classes.rightArrowEnabled} onClick={() => setIndex(index + 1)} alt="rightarrow" />
            </div>
          )}
          {index === data.length - 1 && (
            <div>
              {console.log('chunk', index)}
              <img src={SliderArrow} className={classes.leftArrowEnabled} onClick={() => setIndex(index - 1)} alt="leftarrow" />
              <img src={SliderArrow} className={classes.rightArrowDisabled} alt="rightarrow" />
            </div>
          )}
          <Button onClick={memoGoTo(ROUTES.REVIEWS)}>Все отзывы</Button>
        </div>
        <div className={classes.reviews_chunk}>
          <div className={classes.reviews_chunk_left}>
            <div>
              {data[index].length >= 1 && (
                <ReviewCard reviewCard={data[index][0]} />
              )}
            </div>
            <div>
              {data[index].length >= 2 && (
                <ReviewCard reviewCard={data[index][1]} />
              )}
            </div>
          </div>
          <div className={classes.reviews_chunk_right}>
            <div>
              {data[index].length >= 3 && (
              <ReviewCard reviewCard={data[index][2]} />
              )}
            </div>
            <div>
              {data[index].length >= 4 && (
              <ReviewCard reviewCard={data[index][3]} />
              )}
            </div>
          </div>
        </div>
      </Container>

      <Container className={classes.reserve_currencies}>
        <p>Резерв валюты</p>
        <div className={classes.reserve_main}>
          <div>
            <p>ВТБ24 RUB</p>
            <span>{CURRENCY_LIST[0].reserve}</span>
          </div>
          <div>
            <img src={VtbImg} alt="vtb" />
            <p>ВТБ24 RUB</p>
            <span>5000000</span>
          </div>
          <div>
            <img src={VtbImg} alt="vtb" />
            <p>ВТБ24 RUB</p>
            <span>5000000</span>
          </div>
          <div>
            <img src={VtbImg} alt="vtb" />
            <p>ВТБ24 RUB</p>
            <span>5000000</span>
          </div>
          <div>
            <img src={VtbImg} alt="vtb" />
            <p>ВТБ24 RUB</p>
            <span>5000000</span>
          </div>
          <div>
            <img src={VtbImg} alt="vtb" />
            <p>ВТБ24 RUB</p>
            <span>5000000</span>
          </div>
        </div>
        <div className={classes.reserve_main}>
          <div>
            <img src={VtbImg} alt="vtb" />
            <p>ВТБ24 RUB</p>
            <span>5000000</span>
          </div>
          <div>
            <img src={VtbImg} alt="vtb" />
            <p>ВТБ24 RUB</p>
            <span>5000000</span>
          </div>
          <div>
            <img src={VtbImg} alt="vtb" />
            <p>ВТБ24 RUB</p>
            <span>5000000</span>
          </div>
          <div>
            <img src={VtbImg} alt="vtb" />
            <p>ВТБ24 RUB</p>
            <span>5000000</span>
          </div>
          <div>
            <img src={VtbImg} alt="vtb" />
            <p>ВТБ24 RUB</p>
            <span>5000000</span>
          </div>
          <div>
            <img src={VtbImg} alt="vtb" />
            <p>ВТБ24 RUB</p>
            <span>5000000</span>
          </div>
        </div>
      </Container>
    </div>

  );
  function goTo(path: string): { (): void } {
    return () => {
      window.scroll(0, 0);
      history.push(path);
      window.scroll(0, 0);
    };
  }
};

export default Home;
