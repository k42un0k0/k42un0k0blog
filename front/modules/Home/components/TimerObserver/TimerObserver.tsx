import React from "react"
import { observer } from "mobx-react-lite";
import { Timer } from "../../store/Timer";

type Props = { timer: Timer }

export default observer(function TimerObserver({ timer }: Props) {
  return <div>
    <span data-testid="num">
      {timer.secondsPassed}
    </span>
  </div>
})
