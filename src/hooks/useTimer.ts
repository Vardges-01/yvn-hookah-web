import { useEffect, useState, useRef } from 'react';
import { Level } from '../types/blind.types';
import useTimerAudio from './useTimerAudio';

interface UseTimerOptions {
  levels: Level[];
  currentLevel: number;
  isRunning: boolean;
  onLevelAdvance?: (nextLevel: number) => void;
  onTimerStop?: () => void;
}

export default function useTimer({
  levels,
  currentLevel,
  isRunning,
  onLevelAdvance,
  onTimerStop,
}: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(levels[currentLevel]?.duration * 60 || 0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { tickAudio, gongAudio } = useTimerAudio();

  useEffect(() => {
    setTimeLeft(levels[currentLevel]?.duration * 60 || 0);
  }, [currentLevel, levels]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 7 && prevTime > 1 && tickAudio.current) {
          tickAudio.current.pause();
          tickAudio.current.currentTime = 0;
          tickAudio.current.play();
        }
        if (prevTime === 2 && gongAudio.current) {
          tickAudio.current?.pause();
          gongAudio.current.pause();
          gongAudio.current.currentTime = 0;
          gongAudio.current.play();
        }
        if (prevTime <= 1) {
          if (currentLevel < levels.length - 1) {
            onLevelAdvance?.(currentLevel + 1);
            return levels[currentLevel + 1].duration * 60;
          } else {
            onTimerStop?.();
            return 0;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, currentLevel, levels]);

  return {
    timeLeft,
    setTimeLeft,
  };
}
