/* eslint-disable */
/** authorized response */
export type Auth = {
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
  ID: number;
  Title: string;
  Body: string;
  BlogType: number;
};
