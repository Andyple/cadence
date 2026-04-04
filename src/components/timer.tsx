"use client";

import { useTimer } from "./timer-context";
import { cn } from "@/lib/utils";

export function Timer() {
  const {
    timeRemaining,
    isRunning,
    currentPhase,
    focusDuration,
    breakDuration,
    toggleTimer,
    resetTimer,
  } = useTimer();

  // Calculate format
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Calculate progress for SVG circle
  const totalPhaseSeconds = currentPhase === "focus" ? focusDuration * 60 : breakDuration * 60;
  const progress = totalPhaseSeconds > 0 ? timeRemaining / totalPhaseSeconds : 0;
  
  // SVG Circle calculations
  const radius = 180;
  const circumference = 2 * Math.PI * radius;
  // Use negative offset to make the ring drain clockwise
  const strokeDashoffset = -(circumference - progress * circumference);

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl py-12">
      {/* Pomodoro Timer */}
      <div className="relative aspect-square w-full max-w-sm mb-12 flex items-center justify-center">
        
        {/* SVG Background Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 transform"
          viewBox="0 0 400 400"
        >
          <circle
            cx="200"
            cy="200"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
            className="text-zinc-200 dark:text-zinc-800 transition-colors duration-300"
          />
          {/* SVG Progress Ring */}
          <circle
            cx="200"
            cy="200"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset,
              transition: isRunning ? "stroke-dashoffset 1s linear" : "stroke-dashoffset 0.5s ease-in-out",
            }}
            className={cn(
              "transition-colors duration-300",
              currentPhase === "focus"
                ? "text-zinc-900 dark:text-zinc-50"
                : "text-blue-500 dark:text-blue-400"
            )}
          />
        </svg>

        {/* Text Inner Content */}
        <div className="relative flex flex-col items-center justify-center space-y-2 z-10">
          <span className="text-7xl font-mono font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            {timeString}
          </span>
          <span className={cn(
            "font-medium uppercase tracking-[0.2em] text-xs transition-colors duration-300",
            currentPhase === "focus" ? "text-zinc-500 dark:text-zinc-400" : "text-blue-500 dark:text-blue-400"
          )}>
            {currentPhase === "focus" ? "Focus Session" : "Break Session"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleTimer}
          className={cn(
            "px-10 py-4 font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg w-40 flex items-center justify-center",
            currentPhase === "focus"
              ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200"
              : "bg-blue-500 text-white hover:bg-blue-600"
          )}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-10 py-4 bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 font-bold rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105 active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
}