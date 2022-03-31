/* eslint-disable max-len */
import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@/ui/Button/Button';
import ROUTES from '@/const/routes';
import classes from './Account.module.scss';
import DiscountImg from '@/assets/img/discount.svg';

type PropsType = {

}

const AccountAsideMenu: FC<PropsType> = () => {
  const history = useHistory();
  const memoGoTo = useCallback(goTo, [history]);
  const [isPersonalArea, setIsPersonalArea] = useState(true);
  return (
    <div className={classes.root}>
      <div className={classes.main_container}>
        <div className={classes.sideMenu}>
          <div className={classes.sideMenu_block}>
            {!isPersonalArea && (
            <img src={DiscountImg} alt="" />
            )}
            <div className={classes.myAccountWordBlock}>
              <Button className={classes.Button} onClick={() => { memoGoTo(ROUTES.ACCOUNT_PERSONAL_AREA)(); setIsPersonalArea(true); }}>Личный кабинет</Button>
            </div>
            <div>
              <Button className={classes.Button} onClick={() => { memoGoTo(ROUTES.ACCOUNT_SECURITY_SETTINGS)(); setIsPersonalArea(false); }}>Настройки безопасности</Button>
            </div>
            <div>
              <Button className={classes.Button} onClick={() => { memoGoTo(ROUTES.ACCOUNT_OPERATIONS)(); setIsPersonalArea(false); }}>Ваши операции</Button>
            </div>
            <div>
              <Button className={classes.Button} onClick={memoGoTo(ROUTES.RULES)}>Правила сайта</Button>
            </div>
            <div>
              <Button className={classes.Button} onClick={memoGoTo(ROUTES.FAQ)}>FAQ</Button>
            </div>
            <div>
              <Button className={classes.Button} onClick={memoGoTo(ROUTES.CONTACTS)}>Поддержка</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function goTo(path: string): {(): void} {
    return () => {
      window.scroll(0, 0);
      history.push(path);
    };
  }
};

export default AccountAsideMenu;
