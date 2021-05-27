import Link from 'next/link';
import { pagesPath } from '../../lib/$path';
import { TimerObserver } from './components/TimerObserver';
import { Timer } from './store/Timer';

const timer = new Timer();

function Home(): JSX.Element {
  return (
    <div>
      <h1>home page</h1>
      <Link href={pagesPath.auth.sign_in.$url()}> goto signIn page </Link>
      <Link href={pagesPath.blogs.$url()}> goto blogs page </Link>
      <button onClick={timer.increaseTimer}>Push!</button>
      <TimerObserver timer={timer} />
    </div>
  );
}

export default Home;
