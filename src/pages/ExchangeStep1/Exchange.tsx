/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
  FC, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { sum, xor } from 'lodash';
import { timeLog } from 'console';
import Button from '@/ui/Button/Button';
import classes from './Exchange.module.scss';
import BackArrowImg from '@/assets/img/gobackarrow.svg';
import ArrowUpperCloud from '@/assets/img/arrowuppercloud.svg';
import Select from '@/ui/Select';
import CURRENCY_LIST, { CurrencyUnitEnum } from '@/const/currencies';
import Input from '@/ui/Input/Input';
import ShuffleImg from '@/assets/img/shuffle.png';
import Container from '@/utils/components/Container';
import StatusBarHalfImg from '@/assets/img/statusbarhalf.svg';
import ROUTES from '@/const/routes';
import CopyImg from '@/assets/img/copy.svg';
import QrCodeImg from '@/assets/img/qrcode.png';
import { BidDataType, CurrencyType, UserDataType } from '@/utils/model';
import StartStatusImg from '@/assets/img/statusstart.svg';
import UserContext from '@/utils/components/Layout/components/Context/UserContext';

type IProps = {
  exchangeCurrencies?: {from: string, to: string};
}

const Exchange: FC<IProps> = (props) => {
  const [userData, setUserData] = useState<UserDataType | null>();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [FCs, setFCs] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [currencyIndexFrom, setCurrencyIndexFrom] = useState(0);
  const [currencyIndexTo, setCurrencyIndexTo] = useState(1);
  const [currencyValueFrom, setCurrencyValueFrom] = useState<number>(1);
  const [currencyValueTo, setCurrencyValueTo] = useState<number>(0);
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState('');
  const validateEmail = (email: string) => email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  const validatePhoneNumber = (input: string) => {
    const numbers = input.replace(/\D|\W/g, '');
    const mask = '+_(___)___-__-__';
    let displayNumber = '';
    if (numbers.length === 1) {
      displayNumber = mask.slice(0, 2);
    } else if (numbers.length >= 2 && numbers.length < 5) {
      displayNumber = mask.slice(0, numbers.length + 2);
    } else if (numbers.length >= 5 && numbers.length < 8) {
      displayNumber = mask.slice(0, numbers.length + 3);
    } else if (numbers.length >= 8 && numbers.length < 10) {
      displayNumber = mask.slice(0, numbers.length + 4);
    } else if (numbers.length >= 10 && numbers.length < 12) {
      displayNumber = mask.slice(0, numbers.length + 5);
    }
    [...numbers].map((elem) => displayNumber = displayNumber.replace(RegExp(/(_)/), elem));
    setPhoneNumber(numbers);
    setDisplayPhoneNumber(displayNumber);
  };
  const [unitInfo, setUnitInfo] = useState<CurrencyType>();
  const [oneExchange, setOneExchange] = useState(0);
  const [allInfo, setAllInfo] = useState<any>([]);
  const history = useHistory();
  const memoGoTo = useCallback(goTo, [history]);
  const { userAccessToken } = useContext(UserContext);
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

  async function createBid() {
    (window.localStorage.getItem('access_token')) ? (
      await axios.post('http://localhost:8080/api/bid', {
        currency_to: CURRENCY_LIST[currencyIndexTo].unit,
        currency_from: CURRENCY_LIST[currencyIndexFrom].unit,
        sum_from: currencyValueFrom,
        sum_to: currencyValueTo,
        card_number: cardNumber,
        FCs,
        phone_number: phoneNumber,
        telegram,
        email,
      }, {
        headers: {
          'x-auth-token': window.localStorage.getItem('access_token'),
        },
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        setError(err.response.data.message);
      })
    ) : (
      await axios.post('http://localhost:8080/api/bid', {
        currency_to: CURRENCY_LIST[currencyIndexTo].unit,
        currency_from: CURRENCY_LIST[currencyIndexFrom].unit,
        sum_from: currencyValueFrom,
        sum_to: currencyValueTo,
        card_number: cardNumber,
        FCs,
        phone_number: phoneNumber,
        telegram,
        email,
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        setError(err.response.data.message);
      })
    );
  }
  const date = new Date();

  useEffect(() => {
    calculatedSum();
  }, [currencyIndexTo, currencyIndexFrom, currencyValueFrom]);

  useEffect(() => {
    getUnitInfo();
  }, [currencyIndexTo, currencyIndexFrom]);
  useEffect(() => {
    const getData = async () => {
      await axios.get('http://localhost:8080/api/user', {
        headers: {
          'x-auth-token': window.localStorage.getItem('access_token'),
        },
      }).then(async (res) => {
        await res.data.telegram && setTelegram(res.data.telegram);
        await res.data.email && setEmail(res.data.email);
        await res.data.phone && setDisplayPhoneNumber(res.data.phone);
        await res.data.name && setFCs(`${res.data.surname} ${res.data.name} ${res.data.patronymic}`);
        await res.data.card_number && setCardNumber(res.data.card_number);
      });
    };
    getData();
  }, [userAccessToken]);
  return (
    <div className={classes.root}>
      {
          (currentStep === 1) && (
          <Container className={classes.content}>
            <p>Обмен {CURRENCY_LIST[currencyIndexFrom].title} в {CURRENCY_LIST[currencyIndexTo].title}</p>
            <div className={classes.upper_cloud}>
              <div className={classes.left_cloud}>
                <span>Внимание!</span>
                <img src={ArrowUpperCloud} alt="arrow " />
              </div>
              <div className={classes.right_cloud}>
                <div>
                  <p>Данная операция производится оператором в ручном режиме и занимает от 5 до 60 минут в рабочее время (см. статус оператора).
                  </p>
                  <p>
                    Как только Ваши средства будут зачислены мы произведем оплату на указанные в заявке реквизиты. В связи с высокой волатильностью рынка, курс обновляется каждые 5 секунд.
                  </p>
                </div>
                <div>
                  <h1>
                    Время для отправки криптовалюты составляет 15 минут, после этого времени заявка считается не актуальной и необходимо создать новую.
                  </h1>
                  <h1>
                    Обращаем Ваше внимание, что курс фиксируется на момент зачисления криптовалюты на наш кошелек.
                  </h1>
                </div>
                <div>
                  <h2>
                    Внимание! Будет проведена AML-проверка Вашей транзакции.
                  </h2>
                  <h2>
                    При риске 90% и более заявка обрабатывается согласно правил п. 5.22. (потребуется дополнительная верификация)
                  </h2>
                </div>
              </div>
            </div>
            <div className={classes.exchange_cloud}>
              <div className={classes.exchange_main}>
                <div className={classes.exchange_main_left}>
                  <div>
                    <p>
                      Отдаете
                    </p>
                  </div>
                  <div>
                    <div className={classes.select_custom}>
                      <Select data={CURRENCY_LIST} value={CURRENCY_LIST[currencyIndexFrom]} onChange={(e) => setCurrencyIndexFrom(CURRENCY_LIST.indexOf(e))} />
                    </div>
                    <input value={currencyValueFrom} onChange={(e) => setCurrencyValueFrom(+e.target.value)} />
                  </div>
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
                  <div className={classes.exchange_main_left_content}>
                    <div>
                      <Input
                        onChange={setTelegram}
                        value={telegram}
                        placeholder="Telegram"
                      />
                      <Input onChange={setEmail} value={email} placeholder="E-mail*" />
                      {email !== '' && (!validateEmail(email)) && (
                        <span>Неправильный email</span>
                      )}
                      <Input onChange={validatePhoneNumber} value={displayPhoneNumber} placeholder="Телефон*" maxLength={16} />
                    </div>
                  </div>
                </div>
                <div>
                  <img src={ShuffleImg} alt="" />
                </div>
                <div className={classes.exchange_main_right}>
                  <div className={classes.exchange_main_right_header}>
                    <p>
                      Получаете
                    </p>
                    <div>
                      <div className={classes.select_custom}>
                        <Select data={CURRENCY_LIST} value={CURRENCY_LIST[currencyIndexTo]} onChange={(e) => setCurrencyIndexTo(CURRENCY_LIST.indexOf(e))} />
                      </div>
                      <Input value={currencyValueTo} onChange={() => console.log('first')} />
                    </div>
                    <span>
                      min.: 30000 RUB, max.: 4000000 RUB
                    </span>
                  </div>
                  <div className={classes.exchange_main_right_content}>
                    <div>
                      <Input onChange={setCardNumber} value={cardNumber} placeholder="Номер карты*" />
                    </div>
                    <div>
                      <Input onChange={setFCs} value={FCs} placeholder="ФИО получателя*" />
                    </div>
                    <div className={classes.checkBox}>
                      <div>
                        <Input onChange={() => console.log('first')} type="checkbox" className={classes.checkBox_input} />
                        <span>Не запоминать введенные данные</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={() => {
                if (validateEmail(email)) {
                  setCurrentStep(2);
                  window.scroll(0, 250);
                }
              }}
              >ОБМЕНЯТЬ
              </Button>
            </div>
          </Container>
          )
        }

      {
            (currentStep === 2) && (
              <Container className={classes.content}>
                <img src={BackArrowImg} onClick={() => setCurrentStep(1)} alt="" />
                <div className={classes.cloud_main}>
                  <div className={classes.confirm_cloud_main}>
                    <div className={classes.confirm_cloud_main_left}>
                      <p>Отдаете</p>
                      <div>
                        <span>Сумма: {currencyValueFrom} {CURRENCY_LIST[currencyIndexFrom].unit}</span>
                      </div>
                      <div>
                        <img src={CURRENCY_LIST[currencyIndexFrom].img} alt="" />
                      </div>
                      <div>
                        <h1>Личные данные</h1>
                      </div>
                      <span>Номер моб. телефона: <h2>{phoneNumber}</h2> </span>
                      <span>E-mail: <h2>{email}</h2> </span>
                      <span>Telegram: <h2>{telegram}</h2> </span>
                    </div>
                    <div className={classes.confirm_cloud_main_right}>
                      <p>Получаете</p>
                      <span>Сумма: {currencyValueTo} {CURRENCY_LIST[currencyIndexTo].unit}  </span>
                      <img src={CURRENCY_LIST[currencyIndexTo].img} alt="" />
                      <span>На счет: {cardNumber} </span>
                      <span>ФИО получателя: {FCs} </span>
                      <div>
                        <Input onChange={() => console.log('s')} type="checkbox" />
                        <h2>С правилами сервиса ознакомлен и согласен</h2>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => {
                    setCurrentStep(3);
                    createBid();
                    window.scroll(0, 220);
                  }}
                  >СОЗДАТЬ ЗАЯВКУ
                  </Button>
                </div>
              </Container>
            )
          }
      {
            (currentStep === 3) && (
              <Container className={classes.content}>
                <img src={BackArrowImg} onClick={() => setCurrentStep(2)} alt="" />
                <div className={classes.payment_cloud}>
                  <div className={classes.payment_main}>
                    <p>Как оплатить</p>
                    <span>Для осуществления обмена переведите указанную в Вашей заявке сумму в Bitcoin(BTC) на этот кошелек:</span>
                    <div>
                      <img src={CopyImg} alt="Copy" />
                      <span>{CURRENCY_LIST[currencyIndexTo].wallet}</span>
                    </div>
                    <div>
                      <img src={QrCodeImg} alt="QR" />
                    </div>
                  </div>
                  <div className={classes.underQr}>
                    <p>После оплаты:</p>
                    <span>
                      Нажмите на кнопку «Я оплатил заявку»
                    </span>
                    <span>
                      И ожидайте обработку заявки
                    </span>
                  </div>
                  <div className={classes.green_dongle}>
                    <div>
                      <p>Сумма платежа: <span>{currencyValueFrom} {CURRENCY_LIST[currencyIndexFrom].unit}</span></p>
                      <p>Сумма к получению: <span> {currencyValueTo} {CURRENCY_LIST[currencyIndexTo].unit}</span></p>
                    </div>
                  </div>

                  <div className={classes.attention_cloud}>
                    <div>
                      <span> <strong>Пожалуйста, будьте внимательны!</strong> Все поля должны быть заполнены в точном соответствии с инструкцией. В противном случае, платеж может не пройти.</span>
                    </div>
                  </div>

                  <div className={classes.status_block}>
                    <div>
                      <span><strong>Время создания:</strong> {`${date.getMonth()}.${date.getDay()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`} МСК</span>
                      <span><strong>Статус заявки:</strong> Принята, ожидает оплаты клиентом</span>
                    </div>
                    <img src={StatusBarHalfImg} alt="status_bar" />
                  </div>
                  <div className={classes.updating}>
                    <div>
                      <span>Страница обновляется каждые 30 секунд.</span>
                      <Button>Отключить обновление</Button>
                    </div>
                  </div>
                  <div className={classes.create_buttons}>
                    <div className={classes.create_buttons_block}>
                      <Button className={classes.create_buttons_block_cancel} onClick={() => { setCurrentStep(1); window.scroll(0, 700); }}>ОТМЕНИТЬ ЗАЯВКУ</Button>
                      <Button className={classes.create_buttons_block_create} onClick={() => { setCurrentStep(4); window.scroll(0, 250); }}>Я ОПЛАТИЛ ЗАЯВКУ</Button>
                    </div>
                  </div>
                </div>
              </Container>
            )
          }
      {
            (currentStep === 4) && (
              <Container className={classes.content}>
                <img src={BackArrowImg} onClick={() => setCurrentStep(3)} alt="" />
                <p>Заявка ID 52654</p>

                <div className={classes.main}>
                  <div className={classes.main_cloud}>
                    <p>Заявка оплачена клиентом</p>
                    <span>Подтверждение оплаты принято.</span>
                    <span>Ваша заявка обрабатывается.</span>
                  </div>

                  <div className={classes.green_dongle2}>
                    <span>Отдаете: {currencyValueFrom} {CURRENCY_LIST[currencyIndexFrom].unit}</span>
                    <span>Получаете: {currencyValueTo} {CURRENCY_LIST[currencyIndexTo].unit} , На счет: {cardNumber}</span>
                  </div>
                  <span><strong>Время создания:</strong> 27.11.2021  03:45 МСК</span>
                  <span><strong>Статус заявки:</strong> Заявка оплачена клиентом</span>
                  <img src={StartStatusImg} alt="status" />
                  <div className={classes.updating2}>
                    <span>
                      Страница обновляется каждые 30 секунд.
                    </span>
                    <div>
                      <Button>Отключить обновление</Button>
                    </div>
                  </div>
                </div>
              </Container>
            )
          }
      <Container className={classes.content}>
        <div className={classes.bottom_cloud}>
          <div className={classes.bottom_cloud_content}>
            <span>Обмен Bitcoin BTC на Сбербанк RUB</span>
            <p>
              Для обмена Вам необходимо выполнить несколько шагов:
            </p>
            <p>
              1. Заполните все поля представленной формы. Нажмите кнопку «ОБМЕНЯТЬ».
            </p>
            <p>
              2. Ознакомьтесь с условиями договора на оказание услуг обмена, если вы принимаете их, поставьте галочку в соответствующем поле/нажмите кнопку «Принимаю» («Согласен»). Еще раз проверьте данные заявки.
            </p>
            <p>
              3. Оплатите заявку. Для этого следует совершить перевод необходимой суммы, следуя инструкциям на нашем сайте.
            </p>
            <p>
              4. После выполнения указанных действий, система переместит Вас на страницу «Состояние заявки», где будет указан статус вашего перевода.
            </p>
            <p>
              Внимание: для выполнения данной операции потребуется участие оператора (см. статус оператора).
            </p>
          </div>
        </div>
      </Container>
    </div>

  );
  function goTo(path: string): { (): void } {
    return () => {
      history.push(path);
    };
  }
};

export default Exchange;
