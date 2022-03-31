/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '@/const/routes';
import classes from './AsideMenu.module.scss';
import LoginImage from './img/login.png';
import CloseImage from './img/close.png';

interface AsideMenuProps {
  onClose: { (): void }
}

const AsideMenu: FC<AsideMenuProps> = ({ onClose }) => {
  console.log('object');
  return (
    <div className={classes.root}>
      <button className={classes.close__button} type="button">
        <img className={classes.close__button__img} src={CloseImage} alt="Войти" onClick={() => onClose()} />
      </button>
      <button className={classes.login__button} type="button">
        <img className={classes.login__button__img} src={LoginImage} alt="Войти" />
        Войти
      </button>
      <div className={classes.menu__flex}>
        <Link className={classes.menu__link} to={ROUTES.HOME}>главная</Link>
        <Link className={classes.menu__link} to={ROUTES.RULES}>правила сайта</Link>
        <Link className={classes.menu__link} to={ROUTES.FAQ}>faq</Link>
        <Link className={classes.menu__link} to={ROUTES.REVIEWS}>отзывы</Link>
        <Link className={classes.menu__link} to={ROUTES.CONTACTS}>контакты</Link>
      </div>

    </div>
  );
};

export default AsideMenu;
