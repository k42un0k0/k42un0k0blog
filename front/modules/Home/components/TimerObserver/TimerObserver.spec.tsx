import { render } from "@testing-library/react";
import TimerObserver from "./TimerObserver";
import { Timer } from "../../store/Timer";

test("mobx test sample", () => {
  const timer = new Timer();
  const { getByTestId } = render(<TimerObserver timer={timer} />)


  expect(getByTestId("num").innerHTML).toBe("0");

  timer.increaseTimer();
  expect(getByTestId("num").innerHTML).toBe("1");

})