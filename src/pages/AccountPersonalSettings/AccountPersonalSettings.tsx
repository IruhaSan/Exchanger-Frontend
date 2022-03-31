/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
import React, {
  FC, useContext, useEffect, useState, useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '@/const/routes';
import ExitImg from '@/assets/img/AccountExit.png';
import Button from '@/ui/Button/Button';
import classes from './AccountPersonalSettings.module.scss';
import InputString from '../../ui/InputString/InputString';
import UserContext from '@/utils/components/Layout/components/Context/UserContext';
import { UserDataType } from '@/utils/model';
import DiscountImg from '@/assets/img/discount.svg';

type PropsType = {

}

const AccountPersonalSettings: FC<PropsType> = () => {
  const [userData, setUserData] = useState<UserDataType | null>();
  const { userAccessToken, setAccessToken } = useContext(UserContext);
  const history = useHistory();
  const memoGoTo = useCallback(goTo, [history]);
  const handleLogOut = () => {
    setAccessToken('');
  };
  const handleSubmit = () => {
    axios.patch('http://localhost:8080/api/user', { ...userData }, {
      headers: {
        'x-auth-token': window.localStorage.getItem('access_token'),
      },
    }).then((res) => {
      console.log(res);
    }).catch((message) => console.log(message.response.data.message[0]));
  };
  useEffect(() => {
    const getData = async () => {
      await axios.get('http://localhost:8080/api/user', {
        headers: {
          'x-auth-token': window.localStorage.getItem('access_token'),
        },
      }).then(async (res) => {
        setUserData(await res.data);
      });
    };
    getData();
  }, [userAccessToken]);
  return !userData ? (<></>) : (
    <div className={classes['root-wrapper']}>
      <div className={classes.root}>
        <div className={classes.content}>
          <img src={ExitImg} alt="exitImg" onClick={handleLogOut} />
          <h3>
            Личные данные
            <img src={DiscountImg} alt="" />
          </h3>
          <div>
            <span>Логин:</span>
            <InputString onChange={(value) => setUserData({ ...userData, login: value })} value={userData?.login || ''} disabled />
          </div>
          <div>
            <span>Фамилия:</span>
            <InputString onChange={(value) => setUserData({ ...userData, surname: value })} value={userData?.surname || ''} />
          </div>
          <div>
            <span>Имя:</span>
            <InputString onChange={(value) => setUserData({ ...userData, name: value })} value={userData?.name || ''} />
          </div>
          <div>
            <span>Отчество:</span>
            <InputString onChange={(value) => setUserData({ ...userData, patronymic: value })} value={userData?.patronymic || ''} />
          </div>
          <div>
            <span>E-mail:</span>
            <InputString onChange={(value) => setUserData({ ...userData, email: value })} value={userData?.email || ''} />
          </div>
          <div>
            <span>Номер моб. телефона:</span>
            <InputString onChange={(value) => setUserData({ ...userData, phone: value })} value={userData?.phone || ''} />
          </div>
          <div>
            <span>Skype:</span>
            <InputString onChange={(value) => setUserData({ ...userData, skype: value })} value={userData?.skype || ''} />
          </div>
          <div>
            <span>Telegram:</span>
            <InputString onChange={(value) => setUserData({ ...userData, telegram: value })} value={userData?.telegram || ''} />
          </div>
          <Button className={classes.saveButton} onClick={handleSubmit}>СОХРАНИТЬ</Button>
        </div>
      </div>
    </div>
  );
  function goTo(path: string): { (): void } {
    return () => {
      history.push(path);
    };
  }
};

export default AccountPersonalSettings;
