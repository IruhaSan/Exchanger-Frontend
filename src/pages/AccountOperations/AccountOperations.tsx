/* eslint-disable camelcase */
import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import clsx from 'clsx';
import axios from 'axios';
import Select from '@/ui/Select';
import CURRENCY_LIST, { CurrencyType, CurrencyUnitEnum } from '@/const/currencies';
import classes from './AccountOperations.module.scss';
import Button from '@/ui/Button/Button';
import UserContext from '@/utils/components/Layout/components/Context/UserContext';

type PropsType = {

}

type TransactionsType = {
  id: number;
  date: string;
  currency_to: CurrencyUnitEnum;
  sum_to: number;
  sum_from: number;
  status: string;
  createdAt: string;
}

const AccountOperations: FC<PropsType> = () => {
  const [transactions, setTransactions] = useState([]);
  const { userAccessToken } = useContext(UserContext);
  useEffect(() => {
    async function getBids() {
      axios.get('http://localhost:8080/api/bid', {
        headers: {
          'x-auth-token': window.localStorage.getItem('access_token'),
        },
      }).then(async (res) => {
        setTransactions(await res.data.allBids);
      }).catch((message) => {
        console.log(message);
      });
    }
    getBids();
  }, [userAccessToken]);
  return (
    <div className={classes['root-wrapper']}>
      {console.log(transactions)}
      <div className={classes.root}>
        <span>Ваши операции</span>
        <div className={classes.content}>
          <div className={classes.table}>
            <div className={classes.tabula}>
              <div className={classes.row}>
                <span>Персональная скидка</span>
                <div>
                  <span>0%</span>
                </div>
              </div>
            </div>
            <div className={classes.tabula}>
              <div className={classes.row}>
                <span>Обменов</span>
                <div>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className={classes.tabula}>
              <div className={clsx(classes.row, classes.row_last)}>
                <span>Кол-во обменов</span>
                <div>
                  <span>0 USD</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.table}>
            <div className={classes.tabula}>
              <div className={classes.row}>
                <div>
                  <span>ID</span>
                </div>
                <div>
                  <span>Дата</span>
                </div>
                <div>
                  <span>Курс</span>
                </div>
                <div>
                  <span>Отдаете</span>
                </div>
                <div>
                  <span>Получаете</span>
                </div>
                <div>
                  <span>Статус</span>
                </div>
              </div>

              {transactions.map((item: TransactionsType, index: number) => (
                <div className={classes.row} key={'transaction' + `${index}`}>
                  <div>
                    <span>{item.id}</span>
                  </div>
                  <div>
                    <span>{item.createdAt}</span>
                  </div>
                  <div>
                    <span>{item.currency_to}</span>
                  </div>
                  <div>
                    <span>{item.sum_to}</span>
                  </div>
                  <div>
                    <span>{item.sum_from}</span>
                  </div>
                  <div>
                    <span>{item.status}</span>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOperations;
