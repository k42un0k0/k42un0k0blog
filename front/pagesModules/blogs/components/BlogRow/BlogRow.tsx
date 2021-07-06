import { formatAt } from '../../../../lib/struct';
import type { BlogResponse } from '../../../../api/@types';

type Prop = {
  item: BlogResponse;
};
export default function BlogRow({ item }: Prop): JSX.Element {
  return (
    <div>
      <h2>{item.title}</h2>
      <p>{formatAt('published_at')('YYYY年mm月DD日')(item)}</p>
    </div>
  );
}
