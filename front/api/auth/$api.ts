/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './refresh_token'
// prettier-ignore
import { Methods as Methods1 } from './sign_out'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/auth/refresh_token'
  const PATH1 = '/auth/sign_out'
  const GET = 'GET'
  const POST = 'POST'

  return {
    refresh_token: {
      /**
       * Refresh Token
       * @returns successfully authorized
       */
      get: (option?: { config?: T }) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
      /**
       * Refresh Token
       * @returns successfully authorized
       */
      $get: (option?: { config?: T }) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`
    },
    sign_out: {
      /**
       * Sign Out
       */
      post: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).send(),
      /**
       * Sign Out
       */
      $post: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH1}`
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
