/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  auth: {
    confirm: {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth/confirm' as const, hash: url?.hash })
    },
    register: {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth/register' as const, hash: url?.hash })
    },
    sign_in: {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth/sign_in' as const, hash: url?.hash })
    }
  },
  blogs: {
    create: {
      $url: (url?: { hash?: string }) => ({ pathname: '/blogs/create' as const, hash: url?.hash })
    },
    edit: {
      $url: (url?: { hash?: string }) => ({ pathname: '/blogs/edit' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/blogs' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
