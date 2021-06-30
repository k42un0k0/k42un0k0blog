import { createContext } from 'react';
import { planeApiClient } from './client';
import type { Auth } from '../../api/@types';
import type { ApiClient } from './client';

export type ContextValue = {
  apiClient: ApiClient;
  setAuthResponse: (res: Auth) => void;
  removeAuthToken: () => void;
  isLoggedIn: () => boolean;
};

export const ApiClientContext = createContext<ContextValue>({
  apiClient: planeApiClient,
  setAuthResponse: function (res: Auth): void {
    void res;
  },
  removeAuthToken: function () {
    void 0;
  },
  isLoggedIn: function () {
    return false;
  },
});

export const ApiClientProvider = ApiClientContext.Provider;
