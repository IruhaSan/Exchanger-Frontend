/* eslint-disable react/self-closing-comp */
import React, { FC, useContext } from 'react';
import classes from './Contacts.module.scss';
import AuthorizationCard from '@/utils/components/AuthorizationCard/AuthorizationCard';
import Container from '@/utils/components/Container';
import UserContext from '@/utils/components/Layout/components/Context/UserContext';
import Button from '@/ui/Button/Button';
import Input from '@/ui/Input/Input';

type PropsType = {

}

const Contacts: FC<PropsType> = () => {
  const { userAccessToken, setAccessToken } = useContext(UserContext);
  return (
    <div className={classes.root}>
      <Container className={classes.cloud__main}>
        <div className={classes.cloud__main__area}>
          <p>Форма контактов</p>
          <div>
            <span>
              Ваше имя
              <strong>*</strong>
              :
            </span>
            <Input onChange={console.log} />
            <span>
              Ваше E-mail
              <strong>*</strong>
              :
            </span>
            <Input onChange={console.log} />
            <span>
              ID обмена
              :
            </span>
            <Input onChange={console.log} />
            <span>
              Сообщение
              <strong>*</strong>
              :
            </span>
            <Input onChange={console.log} />
          </div>
        </div>
        <Button>ОТПРАВИТЬ СООБЩЕНИЕ</Button>
      </Container>
    </div>

  );
};

export default Contacts;
