"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

type Phase = "focus" | "break";

interface TimerContextType {
  focusDuration: number;
  breakDuration: number;
  currentPhase: Phase;
  timeRemaining: number;
  isRunning: boolean;
  setFocusDuration: (minutes: number) => void;
  setBreakDuration: (minutes: number) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [currentPhase, setCurrentPhase] = useState<Phase>("focus");
  const [timeRemaining, setTimeRemaining] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Sync timeRemaining if durations change while paused
  useEffect(() => {
    if (!isRunning) {
      if (currentPhase === "focus") setTimeRemaining(focusDuration * 60);
      else setTimeRemaining(breakDuration * 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusDuration, breakDuration, currentPhase]);

  const toggleTimer = useCallback(() => setIsRunning((prev) => !prev), []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeRemaining(currentPhase === "focus" ? focusDuration * 60 : breakDuration * 60);
  }, [currentPhase, focusDuration, breakDuration]);

  const handlePhaseComplete = useCallback(() => {
    setIsRunning(false);
    const nextPhase = currentPhase === "focus" ? "break" : "focus";
    setCurrentPhase(nextPhase);
    setTimeRemaining(nextPhase === "focus" ? focusDuration * 60 : breakDuration * 60);
  }, [currentPhase, focusDuration, breakDuration]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeRemaining === 0) {
      handlePhaseComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, handlePhaseComplete]);

  return (
    <TimerContext.Provider
      value={{
        focusDuration,
        breakDuration,
        currentPhase,
        timeRemaining,
        isRunning,
        setFocusDuration,
        setBreakDuration,
        toggleTimer,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
