/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC, useCallback, useContext, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '@/const/routes';
import Container from '@/utils/components/Container';
import classes from './AuthorizationCard.module.scss';
import Button from '@/ui/Button/Button';
import CloseImg from '@/assets/img/auth_close.svg';
import Input from '@/ui/Input/Input';
import AccountPersonalSettings from '@/pages/AccountPersonalSettings';
import UserContext from '@/utils/components/Layout/components/Context/UserContext';

type PropsType = {
  authorizationToggle: boolean;
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>;
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
  registerCard: boolean;
}

const AuthorizationCard: FC<PropsType> = ({
  authorizationToggle, setAuthorization, registerCard, setRegister,
}) => {
  const handleCloseForm = () => {
    document.body.style.overflow = '';
    setAuthorization(false);
    setRegister(false);
  };
  const handleCloseAuth = () => {
    setAuthorization(false);
    setRegister(!registerCard);
  };
  const { userAccessToken, setAccessToken } = useContext(UserContext);
  const history = useHistory();
  const memoGoTo = useCallback(goTo, [history]);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registerStatus, setRegisterStatus] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [registerTosCheck, setRegisterTos] = useState(false);
  const [loginTosCheck, setLoginTos] = useState(true);

  const validateEmail = (email: string) => email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  const handleRegistration = () => {
    validateEmail(email) ? console.log('nice cock') : console.log('cringe');
    if (login !== '') {
      if (validateEmail(email)) {
        if (password !== '') {
          if (repeatPassword !== '') {
            if (password === repeatPassword) {
              if (registerTosCheck) {
                axios.post('http://localhost:8080/api/user', { login, password, email }).then((res) => {
                  setRegisterStatus(!registerStatus);
                  setResponseMessage('');
                }).catch((message) => setResponseMessage(message.response.data.message[0]));
              } else {
                setResponseMessage('Вы не согласились с правилами сервиса');
              }
            } else {
              setResponseMessage('Пароли не совпадают');
            }
          } else {
            setResponseMessage('Вы не ввели пароль второй раз');
          }
        } else {
          setResponseMessage('Вы не ввели пароль');
        }
      } else {
        setResponseMessage('Вы указали неправильный e-mail');
      }
    } else {
      setResponseMessage('Вы не ввели логин');
    }
  };
  const handleLogin = () => {
    if (login) {
      if (password) {
        if (loginTosCheck) {
          axios.post('http://localhost:8080/api/auth/login', { login, password }).then((res) => {
            setResponseMessage('');
            setAccessToken(res.data.access_token);
            handleCloseForm();
            memoGoTo(ROUTES.EXCHANGE_STEP)();
          }).catch((message) => setResponseMessage(message.response.data.message[0]));
        } else {
          setResponseMessage('Вы не согласились с правилами сервиса');
        }
      } else {
        setResponseMessage('Вы не ввели пароль');
      }
    } else {
      setResponseMessage('Вы не ввели логин или email');
    }
  };
  return (
    <Container className={classes.root}>
      { !registerCard && (
        <div className={classes.card__block}>
          <div className={classes.card__body}>
            <img src={CloseImg} alt="close_img" onClick={handleCloseForm} />
            <h1>Авторизация</h1>
            <span>
              Логин или e-mail
              <strong>*</strong>
              :
            </span>
            <Input type="text" onChange={setLogin} />
            <span>
              Пароль
              <strong>*</strong>
              :
            </span>
            <Input type="password" onChange={setPassword} />
            <div className={classes.card__body__tos}>
              <span>
                <input type="checkbox" onChange={() => setLoginTos(!loginTosCheck)} className={classes.checkBox__input} defaultChecked />
                C
                <a href="http://localhost:3000/rules" target="_blank" rel="noreferrer"> правилами сервиса </a>
                ознакомлен и согласен
              </span>
            </div>
            <div className={classes.card__body__login}>
              {responseMessage && (
              <h2>{responseMessage}</h2>
              )}
              <Button onClick={handleLogin}>Войти</Button>
              <a>Забыли пароль?</a>
              <span>
                Нет учётной записи?
                <span onClick={handleCloseAuth}> Зарегистрируйтесь</span>
              </span>
            </div>
          </div>
        </div>
      )}
      { registerCard && (
        <div className={classes.card__block}>
          <div className={classes.card__body}>
            <img src={CloseImg} alt="close_img" onClick={handleCloseForm} />
            <h1>Регистрация</h1>
            {registerStatus && (
            <h2>
              Вы успешно зарегистрировались!
              <strong onClick={() => setRegister(!registerCard)}> Войти в аккаунт.</strong>
            </h2>
            )}
            <span>
              Логин
              <strong>*</strong>
              :
            </span>
            <Input type="text" onChange={setLogin} />
            <span>
              E-mail
              <strong>*</strong>
              :
            </span>
            <Input type="text" onChange={setEmail} />
            <span>
              Пароль
              <strong>*</strong>
              :
            </span>
            <Input type="text" onChange={setPassword} />
            <span>
              Пароль ещё раз
              <strong>*</strong>
              :
            </span>
            <Input type="text" onChange={setRepeatPassword} />
            <div className={classes.card__body__tos}>
              <span>
                <input type="checkbox" onChange={() => setLoginTos(!loginTosCheck)} className={classes.checkBox__input} />
                C
                <a href="http://localhost:3000/rules" target="_blank" rel="noreferrer"> правилами сервиса </a>
                ознакомлен и согласен
              </span>
            </div>
            <div className={classes.card__body__login}>
              {responseMessage && (
                <h2>{responseMessage}</h2>
              )}
              <Button onClick={handleRegistration}>Зарегистрироваться</Button>
              <h3 onClick={() => { setRegister(!registerCard); setAuthorization(true); }}>
                Уже есть аккаунт?
              </h3>
            </div>
          </div>
        </div>
      )}
    </Container>

  );
  function goTo(path: string): { (): void } {
    return () => {
      history.push(path);
    };
  }
};

export default AuthorizationCard;
