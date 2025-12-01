import React, { useState, useRef, useEffect } from "react";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimeRef = useRef(null);
  const animationRef = useRef(null);

  const tick = () => {
    setElapsedTime(Date.now() - startTimeRef.current);
    animationRef.current = requestAnimationFrame(tick);
  };

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
    animationRef.current = requestAnimationFrame(tick);
  };

  const handlePause = () => {
    setIsRunning(false);
    cancelAnimationFrame(animationRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    cancelAnimationFrame(animationRef.current);
    setElapsedTime(0);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
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
      <h2 style={{ marginBottom: 10 }}>Stopwatch using reqAnimationFrame</h2>

      <div
        style={{
          fontSize: 28,
          marginBottom: 20,
          fontFamily: "monospace",
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
