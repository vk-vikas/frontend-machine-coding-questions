import React, { useState, useRef, useEffect } from "react";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const handleStart = () => {
    if (isRunning) return;

    setIsRunning(true);
    
    // Pretend the stopwatch originally started at (now - alreadyPassed)
    startTimeRef.current = Date.now() - elapsedTime;

    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 10); // fires every 10ms
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setElapsedTime(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (time) => {
    // '/' operation converts it into the unit and
    // '%' removes the access larget units so it spilover to left is ignored
    const ms = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor(time / 3600000);

    const pad = (n, z = 2) => n.toString().padStart(z, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
  };

  return (
    <div style={{ padding: 20, textAlign: "center", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: 10 }}>Stopwatch using setInterval</h2>

      <div
        style={{
          fontFamily: "monospace",
          fontSize: 28,
          marginBottom: 20,
        }}
      >
        {formatTime(elapsedTime)}
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button
          onClick={handleStart}
          disabled={isRunning}
          style={{
            padding: "8px 14px",
            cursor: isRunning ? "not-allowed" : "pointer",
          }}
        >
          Start
        </button>

        <button
          onClick={handlePause}
          disabled={!isRunning}
          style={{
            padding: "8px 14px",
            cursor: !isRunning ? "not-allowed" : "pointer",
          }}
        >
          Pause
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: "8px 14px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
