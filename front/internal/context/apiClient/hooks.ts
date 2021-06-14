import { map, mapLeft } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { useLocalStorage } from 'react-use';
import { useContext, useState, useEffect } from 'react';
import * as yup from 'yup';
import { LocalStorageKey } from '../../../constant/localstorage';
import { createApiClient, createApiClientWithAuth, planeApiClient } from './client';
import { ApiClientContext } from './context';
import { NullError, validateToken } from './utils';
import type { Auth } from '../../../api/@types';
import type { ApiClient } from './client';
import type { ContextValue } from './context';

/**
 * ApiClientContextの初期化処理を行う
 * @return {Object} Contextの値
 */
export function useApiClientValue(): ContextValue {
  const [value, setValue, remove] = useLocalStorage(LocalStorageKey.apiClient, '');
  // Contextに入れる値の生成
  const [client, setClient] = useState(planeApiClient);
  function setAuthResponse(res: Auth): void {
    setValue(JSON.stringify(res));
    setClient(createApiClientWithAuth(res.token));
  }
  function removeAuthToken(): void {
    remove();
    setClient(createApiClient());
  }

  function isLoggedIn(): boolean {
    return !(value == null || value == '');
  }

  // 描画時にlocalstorageを読み取り、expireのチェックとclientの再設定をする
  useEffect(() => {
    pipe(
      validateToken(value),
      map((a) => {
        setClient(createApiClientWithAuth(a.token));
      }),
      mapLeft((e) => {
        if (e instanceof NullError) {
          return;
        } else if (e instanceof yup.ValidationError) {
          console.error(e.message);
          return;
        }
        void planeApiClient.auth.refresh_token
          .$get({
            config: { headers: { Authorization: 'Bearer ' + e.ExpiredToken } },
          })
          .then((refreshRes) => {
            setAuthResponse(refreshRes);
          });
      })
    );
  }, [value]);
  return { apiClient: client, setAuthResponse, removeAuthToken, isLoggedIn };
}

/**
 * ContextからapiClientを取り出す
 * @return {Object} apiClient
 */
export function useApiClient(): ApiClient {
  return useContext(ApiClientContext).apiClient;
}

export function useIsLoggedIn(): () => boolean {
  return useContext(ApiClientContext).isLoggedIn;
}

/**
 * ApiClientContextの値を取り出す
 * @return {Object} Contextの値
 */
export function useApiClientContext(): ContextValue {
  return useContext(ApiClientContext);
}
