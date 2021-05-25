/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './blogs'
// prettier-ignore
import { Methods as Methods1 } from './sign_in'
// prettier-ignore
import { Methods as Methods2 } from './users'
// prettier-ignore
import { Methods as Methods3 } from './users/_id@number'
// prettier-ignore
import { Methods as Methods4 } from './users/_id@number/password'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/blogs'
  const PATH1 = '/sign_in'
  const PATH2 = '/users'
  const PATH3 = '/password'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'

  return {
    blogs: {
      /**
       * ブログ一覧の取得
       * @returns successfully request
       */
      get: (option?: { config?: T }) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
      /**
       * ブログ一覧の取得
       * @returns successfully request
       */
      $get: (option?: { config?: T }) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      /**
       * ブログの作成
       * @returns successfully request
       */
      post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
        fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
      /**
       * ブログの作成
       * @returns successfully request
       */
      $post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
        fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`
    },
    sign_in: {
      /**
       * Sign In
       * @returns successfully authorized
       */
      post: (option: { body: Methods1['post']['reqBody'], config?: T }) =>
        fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).json(),
      /**
       * Sign In
       * @returns successfully authorized
       */
      $post: (option: { body: Methods1['post']['reqBody'], config?: T }) =>
        fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`
    },
    users: {
      _id: (val1: number) => {
        const prefix1 = `${PATH2}/${val1}`

        return {
          password: {
            /**
             * ユーザーのパスワードの更新
             */
            put: (option: { body: Methods4['put']['reqBody'], config?: T }) =>
              fetch<void, BasicHeaders, Methods4['put']['status']>(prefix, `${prefix1}${PATH3}`, PUT, option).send(),
            /**
             * ユーザーのパスワードの更新
             */
            $put: (option: { body: Methods4['put']['reqBody'], config?: T }) =>
              fetch<void, BasicHeaders, Methods4['put']['status']>(prefix, `${prefix1}${PATH3}`, PUT, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH3}`
          },
          /**
           * ユーザーの取得
           * @returns successfully request
           */
          get: (option?: { config?: T }) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * ユーザーの取得
           * @returns successfully request
           */
          $get: (option?: { config?: T }) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          /**
           * ユーザーの更新
           * @returns successfully request
           */
          put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
            fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix1, PUT, option).json(),
          /**
           * ユーザーの更新
           * @returns successfully request
           */
          $put: (option: { body: Methods3['put']['reqBody'], config?: T }) =>
            fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix1, PUT, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * ユーザー一覧の取得
       * @returns successfully request
       */
      get: (option: { query: Methods2['get']['query'], config?: T }) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json(),
      /**
       * ユーザー一覧の取得
       * @returns successfully request
       */
      $get: (option: { query: Methods2['get']['query'], config?: T }) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
      /**
       * ユーザーの作成
       * @returns successfully request
       */
      post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
        fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json(),
      /**
       * ユーザーの作成
       * @returns successfully request
       */
      $post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
        fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods2['get']['query'] }) =>
        `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
