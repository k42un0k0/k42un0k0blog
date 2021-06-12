/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
  /** ブログ一覧の取得 */
  get: {
    status: 200;
    /** successfully request */
    resBody: Types.BlogResponse[];
  };

  /** ブログの作成 */
  post: {
    status: 200;
    /** successfully request */
    resBody: Types.BlogResponse;

    reqBody: {
      title: string;
      body: string;
      blog_type: Types.BlogType;
    };
  };
};
