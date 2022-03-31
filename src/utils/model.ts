export type ReviewCardType = {
    clientName: string;
    reviewDate: string;
    reviewBody: string;
}

export enum CurrencyUnitEnum {
    BTC = 'BTC',
    ETH = 'ETH',
    RUB = 'RUB',
    XRP = 'XRP',
    BNB = 'BNB',
    LTC = 'LTC',
    MATIC = 'MATIC',
    XLM = 'XLM',
    TRX = 'TRX',
    ATOM = 'ATOM',
    DASH = 'DASH',
    DOGE = 'DOGE',
    WAVES = 'WAVES',
    SOL = 'SOL',
    USDT = 'USDT',
  }

export type CurrencyType = {
    title: string;
    unit: CurrencyUnitEnum;
    isCoin: boolean;
    wallet: string;
    reserve: number;
    img: string;
    data: CurrencyType;
  }

export type BidDataType = {
    cardNumber: string;
    phoneNumber: string;
    FCs: string;
    telegram: string;
    email: string;
  }

export type UserDataType = {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  login: string;
  skype: string;
  telegram: string;
  phone: string;
  authNotificationEmail: boolean;
  authNotificationTg: boolean;
  authNotificationSms: boolean;
  pinAuthSms: boolean;
  pinAuthTg: boolean;
  passwordRecovery: boolean;
}
