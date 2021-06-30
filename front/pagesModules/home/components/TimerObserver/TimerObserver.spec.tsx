import { render } from '@testing-library/react';
import { Timer } from '../../store/Timer';
import TimerObserver from './TimerObserver';

test('mobx test sample', () => {
  const timer = new Timer();
  const { getByTestId } = render(<TimerObserver timer={timer} />);
  expect(getByTestId('num').innerHTML).toBe('0');

  timer.increaseTimer();
  expect(getByTestId('num').innerHTML).toBe('1');
});
