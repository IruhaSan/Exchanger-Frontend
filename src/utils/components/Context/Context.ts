/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import CURRENCY_LIST, { CurrencyType, CurrencyUnitEnum } from '@/const/currencies';

type ContextType = {
    pairs: CurrencyType[];
}

const Context = createContext({ pairs: CURRENCY_LIST });

export default Context;
