/** @jsxImportSource theme-ui */
import { useHighlight } from '../../hooks/useHighlight';
import { md } from '../../utils/md';
type Props = {
  value: string;
};
export default function BlogEditor({ value }: Props): JSX.Element {
  const ref = useHighlight([value]);
  return (
    <span
      ref={ref}
      data-line-numbers={true}
      dangerouslySetInnerHTML={{
        __html: md.render(value),
      }}
    />
  );
}
