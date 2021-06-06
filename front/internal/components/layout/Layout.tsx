import Header from './Header';

type Props = {
  children: React.ReactElement;
};
export default function Layout({ children }: Props): JSX.Element {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
