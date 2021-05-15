import { observer } from 'mobx-react-lite';
import type { Timer } from '../../store/Timer';

type Props = {
  timer: Timer;
};

export default observer(function TimerObserver({ timer }: Props) {
  return (
    <div>
      <span data-testid="num">{timer.secondsPassed}</span>
    </div>
  );
});
