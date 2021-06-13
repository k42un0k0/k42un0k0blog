/* eslint-disable */
import type * as Types from '../../@types';

export type Methods = {
  /** ユーザーの取得 */
  get: {
    status: 200;
    /** successfully request */
    resBody: Types.BlogResponse;
  };

  /** ユーザーの更新 */
  put: {
    status: 200;
    /** successfully request */
    resBody: Types.BlogResponse;
    reqBody: Types.BlogUpdateRequestBody;
  };
};
