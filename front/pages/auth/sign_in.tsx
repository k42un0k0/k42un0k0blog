import { SignIn } from '../../internal/auth/sign_in';

export type Query = {
  redirect_to?: string;
};
export default SignIn;
