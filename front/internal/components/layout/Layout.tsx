import Footer from './Footer';
import Header from './Header';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props): JSX.Element {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
