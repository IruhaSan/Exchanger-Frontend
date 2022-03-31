/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import MailImg from '@/assets/img/mail.png';
import BestChangeImg from '@/assets/img/bestchange.png';
import ExpertImg from '@/assets/img/expert.png';
import GlazokImg from '@/assets/img/glazok.png';
import OkChangeImg from '@/assets/img/okchange.png';
import ProtectionImg from '@/assets/img/protection.png';
import classes from './Footer.module.scss';
import ROUTES from '@/const/routes';

const Footer: FC = () => {
  const history = useHistory();
  const memoGoTo = useCallback(goTo, [history]);
  return (
    <div className={classes.root}>
      <div className={classes.footerContentBlock}>
        <div className={classes.siteRulesBlock}>
          <div className={classes.navigation}>карта сайта</div>
          <div className={classes.navigation} onClick={memoGoTo(ROUTES.RULES)}>правила сайта</div>
          <div className={classes.navigation} onClick={memoGoTo(ROUTES.FAQ)}>политика конфиденциальности</div>
        </div>
        <div className={classes.informationBlock}>
          <div className={classes.timeNContactsBlock}>
            <div className={classes.workingHoursBlock}>
              <div className={classes.workingHoursTxt}>График работы</div>
              <div className={classes.serviceInfoBlock}>
                <div className={classes.helpTxt}>Наши операторы помогут Вам</div>
                <div className={classes.serviceTxt}>Сервис работает круглосуточно.</div>
              </div>
            </div>
            <div className={classes.ourContactsBlock}>
              <div className={classes.ourContactsTxt}>Наши контакты</div>
              <div className={classes.emailBlock}>
                <div className={classes.emailTxt}>
                  <img src={MailImg} className={classes.mailImage} alt="" />
                  <div className={classes.emailAdress}>info@obmenko.org</div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.logosBlock}>
            <img src={BestChangeImg} alt="" />
            <img src={ExpertImg} alt="" />
            <img src={GlazokImg} alt="" />
            <img src={OkChangeImg} alt="" />
            <img src={ProtectionImg} alt="" />
          </div>
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

export default Footer;
