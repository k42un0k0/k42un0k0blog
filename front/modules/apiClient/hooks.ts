import * as Either from 'fp-ts/Either';
import * as IO from 'fp-ts/IO';
import * as Task from 'fp-ts/Task';
import * as TaskEither from 'fp-ts/TaskEither';
import { pipe, identity } from 'fp-ts/function';
import { useLocalStorage } from 'react-use';
import { useContext, useState, useEffect } from 'react';
import * as yup from 'yup';
import { LocalStorageKey } from '../../lib/localstorage/constants';
import { NullValueException, RequiredValidationException } from '../../lib/throwable/runtimeException';

import { createApiClient, createApiClientWithAuth, planeApiClient } from './client';
import { ApiClientContext } from './context';
import { validateToken } from './lib';
import type { Auth } from '../../api/@types';
import type { ApiClient } from './client';
import type { ContextValue } from './context';
/**
 * ApiClientContextの初期化処理を行う
 * @return {Object} Contextの値
 */
export function useApiClientValue(): ContextValue {
  const [value, setValue, remove] = useLocalStorage<string>(LocalStorageKey.apiClient);
  const [client, setClient] = useState(planeApiClient);
  function setClientFromAuth(auth: Auth): IO.IO<void> {
    setValue(JSON.stringify(auth));
    setClient(createApiClientWithAuth(auth.token));
    return IO.of(void 0);
  }
  function removeAuthToken(): void {
    remove();
    setClient(createApiClient());
  }

  function isLoggedIn(): boolean {
    return yup.string().required().isValidSync(value);
  }
  useEffect(() => {
    const res = pipe(
      value,
      validateToken,
      TaskEither.fromEither,
      Task.chain((either) => {
        return pipe(
          either,
          Either.match(
            (e) => {
              if (
                e instanceof NullValueException ||
                e instanceof RequiredValidationException ||
                e instanceof yup.ValidationError
              ) {
                return Task.of(IO.of(e));
              }
              return pipe(
                TaskEither.tryCatch(
                  async () =>
                    planeApiClient.auth.refresh_token.$get({
                      config: { headers: { Authorization: 'Bearer ' + e.value } },
                    }),
                  identity
                ),
                Task.map((either2) => {
                  return pipe(
                    either2,
                    Either.match(
                      () => {
                        return removeAuthToken as IO.IO<void>;
                      },
                      (auth) => {
                        return setClientFromAuth(auth);
                      }
                    )
                  );
                })
              );
            },
            (auth) => {
              return Task.of(setClientFromAuth(auth));
            }
          )
        );
      })
    );
    void (async (): Promise<void> => {
      (await res())();
    })();
  }, [value]);
  return { apiClient: client, setAuthResponse: setClientFromAuth, removeAuthToken, isLoggedIn };
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
