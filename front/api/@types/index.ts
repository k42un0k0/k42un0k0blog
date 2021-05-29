/* eslint-disable */
/** authorized response */
export type Auth = {
  code: number;
  expire: string;
  token: string;
};

export type AuthRequest = {
  username: string;
  password: string;
};

export type UserResponse = {
  id: number;
  name: string;
  email: string;
};

export type BlogResponse = {
  id: number;
  title: string;
  body: string;
  blog_type: number;
};
