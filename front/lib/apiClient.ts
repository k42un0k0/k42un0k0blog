import aspida from '@aspida/axios';
import { compareAsc } from 'date-fns';
import { useAsync, useLocalStorage } from 'react-use';
import { useContext, createContext, useState } from 'react';
import api from '../api/$api';
import { LocalStorageKey } from './../constant/localstorage';
import type { Auth } from '../api/@types';

type ContextValue = { apiClient: typeof apiClient; setAuthResponse: (res: Auth) => void; removeAuthToken: () => void };

const apiClient = api(aspida(undefined, { baseURL: process.env.NEXT_PUBLIC_API_URL }));
function createApiClientWithAuth(token: string): typeof apiClient {
  return api(
    aspida(undefined, { baseURL: process.env.NEXT_PUBLIC_API_URL, headers: { Authorization: 'Bearer ' + token } })
  );
}
function createApiClient(): typeof apiClient {
  return api(aspida(undefined, { baseURL: process.env.NEXT_PUBLIC_API_URL }));
}
const ApiClientContext = createContext<ContextValue>({
  apiClient,
  setAuthResponse: function (res: Auth): void {
    void res;
  },
  removeAuthToken: function () {
    void 0;
  },
});

export const ApiClientProvider = ApiClientContext.Provider;

/**
 * ApiClientContextの初期化処理を行う
 * @return {Object} Contextの値
 */
export function useApiClientValue(): ContextValue {
  const [value, setValue, remove] = useLocalStorage(LocalStorageKey.apiClient, '');
  // Contextに入れる値の生成
  const [client, setClient] = useState(apiClient);
  function setAuthResponse(res: Auth): void {
    setValue(JSON.stringify(res));
    setClient(createApiClientWithAuth(res.token));
  }
  function removeAuthToken(): void {
    remove();
    setClient(createApiClient());
  }

  // 描画時にlocalstorageを読み取り、expireのチェックとclientの再設定をする
  useAsync(async (): Promise<void> => {
    if (value != undefined) {
      const auth = JSON.parse(value) as Auth;
      if (compareAsc(new Date(auth.expire), Date.now()) > 0) {
        setClient(createApiClientWithAuth(auth.token));
      } else {
        const refreshRes = await apiClient.auth.refresh_token.$get({
          config: { headers: { Authorization: 'Bearer ' + auth.token } },
        });
        setAuthResponse(refreshRes);
      }
    }
  }, [value]);
  return { apiClient: client, setAuthResponse, removeAuthToken };
}

/**
 * ContextからapiClientを取り出す
 * @return {Object} apiClient
 */
export function useApiClient(): typeof apiClient {
  return useContext(ApiClientContext).apiClient;
}

/**
 * ApiClientContextの値を取り出す
 * @return {Object} Contextの値
 */
export function useApiClientContext(): ContextValue {
  return useContext(ApiClientContext);
}
