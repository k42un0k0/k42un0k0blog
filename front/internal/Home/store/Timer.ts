import { makeAutoObservable } from 'mobx';

export class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer = (): void => {
    this.secondsPassed += 1;
  };
}
