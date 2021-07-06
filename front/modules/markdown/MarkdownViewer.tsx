import { useHighlight } from './useHighlight';
import { useMd2Html } from './useMd2Html';

type Props = {
  value: string;
};
export default function BlogEditor({ value }: Props): RenderReturnType {
  const ref = useHighlight([value]);
  const html = useMd2Html(value);
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
