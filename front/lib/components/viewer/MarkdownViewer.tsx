import { useHighlight } from '../../hooks/useHighlight';
import { useMD2HTML } from '../../hooks/useMD2HTML';
type Props = {
  value: string;
};
export default function BlogEditor({ value }: Props): JSX.Element {
  const ref = useHighlight([value]);
  const html = useMD2HTML(value);
  return (
    <span
      ref={ref}
      data-line-numbers={true}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}
