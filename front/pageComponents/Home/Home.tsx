import React from "react"
import Link from "next/link"
import { useState, useMemo, useReducer } from "react"
import { TimerObserver } from "./components/TimerObserver"
import { Timer } from "./store/Timer"

const timer = new Timer();

const Home = () => {
  const states = useReducer((state: { count: number }, action: { type: string, payload: any }) => {
    switch (action.type) {
      case "INC":
        return { ...state, count: state.count + 1 }
      default:
        return state;
    }
  }, { count: 0 });
  return <div>
    <h1>
      home page
    </h1>
    <Link href="/blogs"> goto blogs page </Link>
    <button onClick={timer.increaseTimer} >Push!</button>
    <TimerObserver timer={timer} />
  </div>;
}

export default Home;