/* eslint-disable */
export type Methods = {
  /** ユーザーのパスワードの更新 */
  put: {
    status: 200;

    reqBody: {
      password: string;
      password_confirmation: string;
    };
  };
};
