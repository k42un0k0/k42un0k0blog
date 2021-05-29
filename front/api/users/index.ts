/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
  /** ユーザー一覧の取得 */
  get: {
    query: {
      /** 0 から始まるページ番号を指定する */
      page: number;
    };

    status: 200;
    /** successfully request */
    resBody: Types.UserResponse[];
  };

  /** ユーザーの作成 */
  post: {
    status: 200;
    /** successfully request */
    resBody: Types.UserResponse;

    reqBody: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    };
  };
};
