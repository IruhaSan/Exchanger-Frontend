import React, { FC, useContext, useState } from 'react';
import axios from 'axios';
import Input from '@/ui/Input/Input';
import classes from './AccountSecuritySettings.module.scss';
import Button from '@/ui/Button/Button';
import UserContext from '@/utils/components/Layout/components/Context/UserContext';

type PropsType = {

}

const AccountSecuritySettings: FC<PropsType> = () => {
  const { userAccessToken, setAccessToken } = useContext(UserContext);
  const [password, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = () => {
    if (password) {
      if (repeatNewPassword) {
        if (password === repeatNewPassword) {
          axios.patch('http://localhost:8080/api/user/pass', { password }, {
            headers: {
              'x-auth-token': userAccessToken,
            },
          }).then((res) => {
            setErrorMessage('Вы успешно изменили пароль');
          }).catch((message) => setErrorMessage(message.response.data.message[0]));
        } else {
          setErrorMessage('Пароли не совпадают');
        }
      } else {
        setErrorMessage('Вы не ввели пароль повторно');
      }
    } else {
      setErrorMessage('Вы не ввели пароль');
    }
  };

  return (
    <div className={classes['root-wrapper']}>
      <div className={classes.root}>
        <div className={classes.content}>
          <h3>Настройки безопасности</h3>
          <div>
            <span>Новый пароль:</span>
            <Input onChange={setNewPassword} />
          </div>
          <div>
            <span>Новый пароль повторно:</span>
            <Input onChange={setRepeatNewPassword} />
          </div>
          <div>
            <span>Восстановление пароля:</span>
            <select>
              <option>Да</option>
              <option>Нет</option>
            </select>
          </div>
          <div>
            <span>Уведомление при авторизации(E-mail):</span>
            <select>
              <option>Нет</option>
              <option>Да</option>
            </select>
          </div>
          <div>
            <span>Авторизация по пин-коду(E-mail):</span>
            <select>
              <option>Нет</option>
              <option>Да</option>
            </select>
          </div>
          <div>
            <span>Уведомление при авторизации(Telegram):</span>
            <select>
              <option>Нет</option>
              <option>Да</option>
            </select>
          </div>
          <div>
            <span>Авторизация по пин-коду(Telegram):</span>
            <select>
              <option>Нет</option>
              <option>Да</option>
            </select>
          </div>
          <div>
            <span>Уведомление при авторизации(SMS):</span>
            <select>
              <option>Нет</option>
              <option>Да</option>
            </select>
          </div>
          <div>
            <span>Авторизация по пин-коду(SMS):</span>
            <select>
              <option>Нет</option>
              <option>Да</option>
            </select>
          </div>
          <div>
            <span>Разрешенные IP-адреса(с новой строки):</span>
            <Input onChange={() => console.log('first')} />
          </div>
          {errorMessage && (
            <h2>{errorMessage}</h2>
          )}
          <Button className={classes.saveButton} onClick={handleSubmit}>СОХРАНИТЬ</Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSecuritySettings;
