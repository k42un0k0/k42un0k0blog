import React from 'react';
import { formatAt } from '../../../../lib/struct';
import type { BlogResponse } from '../../../../api/@types';

type Props = {
  item: BlogResponse;
};
export default function BlogRow({ item }: Props): RenderReturnType {
  return (
    <div>
      <h2>{item.title}</h2>
      <p>{formatAt('published_at')('YYYY年mm月DD日')(item)}</p>
    </div>
  );
}
