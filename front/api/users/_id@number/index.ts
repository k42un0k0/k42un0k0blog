/* eslint-disable */
import type * as Types from '../../@types';

export type Methods = {
  /** ユーザーの取得 */
  get: {
    status: 200;
    /** successfully request */
    resBody: Types.UserResponse;
  };

  /** ユーザーの更新 */
  put: {
    status: 200;
    /** successfully request */
    resBody: Types.UserResponse;

    reqBody: {
      name: string;
      email: string;
    };
  };
};
