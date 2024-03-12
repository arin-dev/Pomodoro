import React, { useState, useRef } from "react";
import "./App.css";

export default function App() {
  const [title, updateTitle] = useState("Pomodoro!");
  const [isRunning, updater] = useState(false);
  const [isFinished, endUpdater] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const interval = useRef(null);
  function handleStart() {
    updateTitle("Time to take a break and RELAX!");
    updater(true);
    interval.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft === 0) {
          endUpdater(true);
          return 0;
        }
        return timeLeft - 1;
      });
    }, 1000);
  }

  function handleStop() {
    updateTitle("Set timer for wrong time?");
    updater(false);
    clearInterval(interval.current);
    // setTimeLeft((timeLeft) => timeLeft - 1);
  }

  function handleReset() {
    updateTitle(
      "Focus on your studies and don't forget to take a break again!"
    );
    setTimeout(() => updateTitle("Pomodoro!!"), 10000);
    endUpdater(false);
    updater(false);
    clearInterval(interval.current);
    setTimeLeft(5 * 60);
  }
  return (
    <div className="app">
      <h2>{title}</h2>
      {/* <span>up up</span> */}
      <div className="timer">
        <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(timeLeft % 60).padStart(2, "0")}</span>
      </div>
      {/* <span>down down</span> */}

      <div className="buttons">
        {isFinished === false &&
          (isRunning === false ? (
            <button onClick={handleStart}>Start</button>
          ) : (
            <button onClick={handleStop}>Stop</button>
          ))}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
