import aspida from '@aspida/axios';
import { compareAsc } from 'date-fns';
import { useContext, createContext, useState, useEffect } from 'react';
import api from '../api/$api';
import { LocalStorageKey } from './../constant/localstorage';
import type { Auth } from '../api/@types';

type ContextValue = { apiClient: typeof apiClient; setAuthResponse: (res: Auth) => void };

const apiClient = api(aspida(undefined, { baseURL: process.env.NEXT_PUBLIC_API_URL }));
function createApiClient(token: string): typeof apiClient {
  return api(
    aspida(undefined, { baseURL: process.env.NEXT_PUBLIC_API_URL, headers: { Authorization: 'Bearer ' + token } })
  );
}

const Context = createContext<ContextValue>({
  apiClient,
  setAuthResponse: function (res: Auth): void {
    void res;
  },
});

export const ApiClientProvider = Context.Provider;
export function useDefaultApiClientValue(): ContextValue {
  const [client, setClient] = useState(apiClient);
  function setAuthResponse(res: Auth): void {
    localStorage.setItem(LocalStorageKey.apiClient, JSON.stringify(res));
    setClient(createApiClient(res.token));
  }
  useEffect(() => {
    void (async function (): Promise<void> {
      const resString = localStorage.getItem('aaa');
      if (resString != null) {
        const res = JSON.parse(resString) as Auth;
        if (compareAsc(new Date(res.expire), Date.now()) > 0) {
          setClient(createApiClient(res.token));
        } else {
          const refreshRes = await apiClient.auth.refresh_token.$get({
            config: { headers: { Authorization: 'Bearer ' + res.token } },
          });
          setAuthResponse(refreshRes);
        }
      }
    })();
  }, []);
  return { apiClient: client, setAuthResponse };
}
export function useApiClient(): typeof apiClient {
  return useContext(Context).apiClient;
}

export function useApiClientContext(): ContextValue {
  return useContext(Context);
}
