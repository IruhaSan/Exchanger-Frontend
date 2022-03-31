import DefaultCurrencyListJson from './currenciesAll.json';

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
};

const CURRENCY_LIST = DefaultCurrencyListJson as CurrencyType[];

export default CURRENCY_LIST;
