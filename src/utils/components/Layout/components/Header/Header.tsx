/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import { useHistory } from 'react-router-dom';
import React, {
  FC, useCallback, useContext, useState,
} from 'react';
import classes from './Header.module.scss';
import LoginImg from './pics/login.png';
import LanguageImg from './pics/language.png';
import LogoImg from './pics/ObmenkoLogo.png';
import Container from '@/utils/components/Container/Container';
import Button from '@/ui/Button/Button';
import ROUTES from '@/const/routes';
import UserContext from '../Context/UserContext';

type PropsType = {
  noSecondBlock?: boolean;
  authorizationToggle: boolean;
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>;
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
  registerCard: boolean;
}

const Header: FC<PropsType> = ({
  noSecondBlock, authorizationToggle, setAuthorization, setRegister, registerCard,
}) => {
  const { userAccessToken, setAccessToken } = useContext(UserContext);
  const history = useHistory();
  const memoGoTo = useCallback(goTo, [history]);
  const handleLogin = () => {
    setAuthorization(!authorizationToggle);
    document.body.style.overflow = 'hidden';
  };
  const handleRegister = () => {
    setRegister(!registerCard);
    document.body.style.overflow = 'hidden';
  };
  const handleLogout = () => {
    window.localStorage.setItem('access_token', '');
    setAccessToken('');
  };
  return (
    <div className={classes.root}>
      <Container className={classes.authorization} wrapperClassName={classes['authorization-wrapper']}>
        <div className={classes.info}>
          <span>info@obmenko.org</span>
          <div />
          <span>Сервис работает круглосуточно</span>
        </div>
        {window.localStorage.getItem('access_token') ? (
          <div className={classes.login}>
            <img src={LoginImg} alt="loginImg" onClick={memoGoTo(ROUTES.ACCOUNT_PERSONAL_AREA)} />
            <span onClick={handleLogout}>Выйти</span>
            <img src={LanguageImg} alt="languageImg" />
          </div>
        ) : (
          <div className={classes.login}>
            <img src={LoginImg} onClick={handleLogin} alt="loginImg" />
            <span onClick={handleLogin}>Войти</span>
            <span onClick={handleRegister}>Регистрация</span>
            <img src={LanguageImg} alt="languageImg" />
          </div>
        )}
      </Container>
      {!noSecondBlock && (
        <Container className={classes.navi} wrapperClassName={classes['navi-wrapper']}>
          <img src={LogoImg} onClick={memoGoTo(ROUTES.HOME)} alt="logoImg" />
          <div className={classes.navi_menu}>
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
        </Container>
      )}
    </div>
  );
  function goTo(path: string): { (): void } {
    return () => {
      window.scroll(0, 0);
      history.push(path);
    };
  }
};

export default Header;
