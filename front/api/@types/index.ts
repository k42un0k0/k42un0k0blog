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

/** 0 - slide 1 - markdown 2 - richtext */
export type BlogType = 0 | 1 | 2;

export type BlogCreateRequestBody = {
  title?: string;
  body?: string;
  blog_type: BlogType;
  published_at?: string;
};

export type BlogUpdateRequestBody = {
  title?: string;
  body?: string;
  published_at?: string;
};

export type BlogResponse = {
  id: number;
  title: string;
  body: string;
  blog_type: BlogType;
  published_at?: string;
};
