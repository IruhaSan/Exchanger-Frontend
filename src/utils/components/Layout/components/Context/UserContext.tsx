/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

type ContextType = {
    userAccessToken: string;
    setAccessToken: {(userAccessToken: string): void};
}

const UserContext = createContext<ContextType>({ userAccessToken: '', setAccessToken: (() => {}) });
export default UserContext;
