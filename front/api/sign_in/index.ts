/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
  /** Sign In */
  post: {
    status: 200;
    /** successfully authorized */
    resBody: Types.Auth;
    reqBody: Types.AuthRequest;
  };
};
